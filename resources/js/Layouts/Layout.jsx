import {createContext} from "react";

export const LayoutContext = createContext();

export default function Layout({children}) {

    // console.log(children.props)

    return <LayoutContext.Provider value={{
        auth: children.props.auth,
    }}>
        <div className="">
            {children}
        </div>
    </LayoutContext.Provider>
}
