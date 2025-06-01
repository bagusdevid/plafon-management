<?php

namespace App\Http\Controllers;

use App\Models\Site;
use App\Models\Task;
use App\Models\TaskOption;
use App\Models\TaskPlayed;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\File;
use Intervention\Image\Laravel\Facades\Image;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $data['tasks'] = Task::orderByDesc('id')
            ->with('site')->has('site')
            ->with('options')
            ->get()
            ->map(function ($item) {
                $photos = explode('.', $item->photo);
                $item->photo_path = asset('storage/tasks/' . $photos[0] . '.' . $photos[1]);
                $item->photo_thumb_path = asset('storage/tasks/' . $photos[0] . '_thumb.' . $photos[1]);
                $item->photo_300_path = asset('storage/tasks/' . $photos[0] . '_std.' . $photos[1]);
                return $item;
            });

        return inertia('Task/Main', $data);
    }

    public function create(Request $request)
    {
        if($request->isMethod('post')) {
            $request->validate([
                'name' => ['required'],
                'photo' => 'required|file|mimes:jpg,jpeg,gif,png|max:2048'
            ]);

            $upload = $request->file('photo');
            $random = Str::random();

            $this->uploadMap($random, $upload, 'tasks/');

            $thumbs_inside = '';
            if(count($request->thumbs_inside) > 0) {
                $thumbs_inside = [];
                foreach ($request->thumbs_inside as $inside) {
                    $thumb_random = Str::random();
                    $this->uploadMap($thumb_random, $inside, 'tasks/');
                    $thumbs_inside[] = $thumb_random . '.' . $inside->getClientOriginalExtension();
                }
            }

            $task = Task::create([
                'site_id' => $request->site_id,
                'name' => $request->name,
                'time_limit' => $request->time_limit,
                'photo' => $random . '.' . $upload->getClientOriginalExtension(),
                'thumbs_inside' => implode(',',$thumbs_inside)
            ]);

            if(count($request->options) > 0) {
                $data_options = [];
                foreach ($request->options as $option) {
                    $data_options[] = [
                        'task_id' => $task->id,
                        'icon' => $option['icon'],
                        'label' => $option['label'],
                        'cost' => $option['cost'],
                    ];
                }
                TaskOption::insert($data_options);
            }

            return redirect()
                ->to('/tasks')
                ->with('message', 'Data successfully created.');
        }

        $data['sites'] = Site::orderBy('name', 'asc')
            ->get();

        return inertia('Task/Create', $data);
    }

    public function edit(Request $request)
    {
        $data['task'] = Task::where('id', $request->id)
            ->with('options')
            ->with('site')->has('site')
            ->get()
            ->map(function ($item) {
                $photos = explode('.', $item->photo);
                $item->photo_path = asset('storage/tasks/' . $photos[0] . '.' . $photos[1]);
                $item->photo_thumb_path = asset('storage/tasks/' . $photos[0] . '_thumb.' . $photos[1]);
                $item->photo_300_path = asset('storage/tasks/' . $photos[0] . '_std.' . $photos[1]);

                if($item->thumbs_inside) {
                    $thumbs = explode(',', $item->thumbs_inside);
                    $tip = [];
                    for($i=0;$i<count($thumbs);$i++) {
                        $th = explode('.', $thumbs[$i]);
                        $tip[] = asset('storage/tasks/' . $th[0] . '_thumb.' . $th[1]);
                    }
                    $item->thumbs_inside_path = $tip;
                } else {
                    $item->thumbs_inside_path = [];
                }

                return $item;
            })
            ->first();

        $data['sites'] = Site::orderBy('name', 'asc')
            ->get();

        return inertia('Task/Edit', $data);
    }

    public function update(Request $request)
    {
//        dd($request->all());
        $random = Str::random();

        $query = Task::where('id', $request->id)
            ->with('options')
            ->with('site')->has('site')
            ->get()
            ->first();

        $validate = [
            'name' => ['required'],
            'time_limit' => ['required'],
        ];
        $data_update = [
            'site_id' => $request->site_id,
            'name' => $request->name,
            'time_limit' => $request->time_limit,
        ];

        if($request->file('photo')) {
            $validate['photo'] = 'mimes:jpg,jpeg,gif,png|max:2048';
            $upload = $request->file('photo');
            $this->uploadMap($random, $upload, 'tasks/');
            $this->deletePhoto($query->photo);
            $data_update['photo'] = $random . '.' . $upload->getClientOriginalExtension();
        }

        $request->validate($validate);

        Task::where('id', $request->id)
            ->update($data_update);

        if(count($request->options) > 0) {
            foreach ($request->options as $option) {
                if($option['id'] > 0) {
                    TaskOption::where('id', $option['id'])
                        ->update([
                            'label' => $option['label'],
                            'cost' => $option['cost'],
                        ]);
                } else {
                    TaskOption::create([
                        'label' => $option['label'],
                        'cost' => $option['cost'],
                    ]);
                }
            }
        }

        return redirect()
            ->to('/tasks')
            ->with('message', 'Data successfully updated.');

//        return response()
//            ->json([
//                'data' => $request->all()
//            ]);
    }

    private function deletePhoto($photo)
    {
        if(Storage::exists('tasks/' . $photo)) {
            $filenames = explode('.', $photo);
            Storage::delete('tasks/' . $photo);
            Storage::delete('tasks/' . $filenames[0] . '_thumb.' . $filenames[1]);
            Storage::delete('tasks/' . $filenames[0] . '_std.' . $filenames[1]);
        }
    }

    public function uploadMap($random, $upload, $path)
    {
        $ext = $upload->getClientOriginalExtension();

        $img = Image::read($upload);
        $this->uploadImage($img, $path . $random . '.' . $ext, $upload);
        $img_thumb = Image::read($upload)
            ->cover(150,150);
        $this->uploadImage($img_thumb, $path . $random . '_thumb.' . $ext, $upload);
        $img_300 = Image::read($upload)
            ->cover(300,300);
        $this->uploadImage($img_300, $path . $random . '_std.' . $ext, $upload);

        return;
    }

    public function uploadImage($img, $filename, $upload)
    {
        return Storage::put($filename, $img->encodeByExtension($upload->getClientOriginalExtension()));
    }

    public function played()
    {
        $data['plays'] = TaskPlayed::orderByDesc('id')
            ->with('sheep')->has('sheep')
            ->with('task')
            ->get()
            ->map(function ($item) {
                $item->bet_decode = json_decode($item->bet);
                $item->bet_options_decode = json_decode($item->bet_options);
                return $item;
            });

        return inertia('Task/Played', $data);
    }
}
