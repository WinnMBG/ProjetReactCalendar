import { createContext, useState } from "react";

export const SaverContext = createContext();

export const SaverProvider = (props) =>{
    
    const [rdvs, setRdvs] = useState([])

    const ajouterRdv = ({id, date, title, comment}) => {
        const clonerdvs = [...rdvs]
        clonerdvs.push({id, date, title, comment})
        setRdvs(clonerdvs)
    }

    const obtenirRdvs = (date) => {
        let rdvsForDate = []
        rdvs.forEach((el) => {
           
            if (el.date?.getDate() === date?.getDate() &&
             el.date?.getMonth() === date?.getMonth() && 
             el.date?.getFullYear() === date?.getFullYear()){
                rdvsForDate.push(el)
            }
        })
        return rdvsForDate
    }

    return <SaverContext.Provider value={{rdvs, ajouterRdv, obtenirRdvs}}>
        {props.children}
    </SaverContext.Provider>
}