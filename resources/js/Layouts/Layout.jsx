import {createContext} from "react";

export const LayoutContext = createContext();

export default function Layout({children}) {

    // console.log(children.props)

    return <LayoutContext.Provider value={{
        auth: children.props.auth,
        flashData: children.props.flash.data,
        flashMessage: children.props.flash.message,
        errors: children.props.errors,
    }}>
        <div className="">
            {children}
        </div>
    </LayoutContext.Provider>
}
