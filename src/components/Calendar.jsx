import { useEffect, useContext } from 'react'
import { useState } from 'react'
import { Card, CardHeader, CardBody } from 'reactstrap'
import { NavLink } from 'react-router-dom'
import "./Calendar.css"
import FormModal from './FormModal'
import { SaverContext } from '../context/useSave'
import RDVModal from './RDVModal' 

const Calendar = () => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const months = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Decembre"]
    const days = ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"]
    const date= new Date() //date courante
    const [index , setIndex] = useState(date.getMonth()) //index du mois 
    const [month, setMonth] = useState(months[index]); // Mois courant
    const [year, setYear] = useState(date.getFullYear()); //annee courante
    const [toggle, setToggle] = useState(false) // fonction toggle de la modal prise rdv
    const [toggleRDV, setToggleRDV] = useState(false) // fonction toggle de la modal consultation rdv
    const {obtenirRdvs} = useContext(SaverContext) 
    const [dayOnClicked, setDayClicked] = useState(null) // jour cliqué

    useEffect(() => {
        setMonth(months[index])
    }, [index, months])

    const toggleModal = () => {
        setToggle(!toggle)
    }

    const toggleModalRDV = () => {
        setToggleRDV(!toggleRDV)
    }

    const dayClicked = (day) => {
        setDayClicked(new Date(`${year}-${month}-${day}`))
    }

    //fonction qui va determiner le nb de joir contenu dans un mois spécifique
    const getNbJoursofMonths = (mois, annee) => {
        let lgMois = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if ((annee % 4 === 0 && annee % 100 !== 0) || annee % 400 === 0) lgMois[1] += 1;
        return lgMois[mois];
    }

    const setPreviousMonth = () => {
        if(index <= 0){
            setIndex(11)
            setYear(year-1)
        } else{
            setIndex(index-1)
        }
    }

    const setNextMonth = () => {
        if(index >= 11){
            setIndex(0)
            setYear(year+1)
        } else{
            setIndex(index+1)
        }
    }

    // Fonction principale qui va effectuer la disposition des jours dans le calendrier
    const dispatchNumbers = () => {

        let obj = [[],[],[],[],[],[],[]]
        let di;
        let nbJours = getNbJoursofMonths(index, year)

        //Remplissage du tableau correspondant au mois
        for(let i = 1; i<=nbJours; i++){
            di = new Date(`${year}-${index+1}-${i}`)
            obj[di.getDay()]?.push(i)
        }

        //Recupération du 1er jour du mois
        let firstday = new Date(`${year}-${index+1}-1`)
        
        //Remplissage des zones vides dans le mois
        for(let i = 0; i<firstday.getDay(); i++){
            obj[i].unshift(" ")
        }

        for(let i = di.getDay()+1; i<7; i++){
             obj[i].push(" ")
        }

        //A partir d'ici, on s'occupe de la disposition finale du mois qui sera rendu.

        let disposition = [[],[],[],[],[]]

        //Ajout d'une ligne si le mois commence par un vendredi ou un samedi
        if(firstday.getDay() >= 5 && nbJours === 31) { disposition.push([]) }

        for(let i = 0; i<disposition.length; i++){
            for(let j = 0; j<7; j++ ){
                disposition[i].push(0)
            }
        }

        //On effectue la transposée du tableau obj pour obtenir la disposition finale.
        for(let i = 0; i<obj[0].length; i++){
            for(let j = 0; j<obj.length; j++ ){
                if(Array.isArray(disposition[i])){
                    disposition[i][j] = obj[j][i]
                }
            }
        }
        return disposition
    }

    let currentMonth = dispatchNumbers()

    return (
        <div className="row justify-content-center mt-5">
           <Card style={{width: "40em", padding:"0 0"}}>
                <CardHeader style={{background:"#0fd9de"}}>
                    <div className='d-flex justify-content-center' style={{gap:'120px', fontSize:'larger'}}>
                        <button className='btn btn-outline-dark' onClick={() => setPreviousMonth()}>Précédent</button>
                            {month}
                        <button className='btn btn-outline-dark' onClick={() => setNextMonth()}>Suivant</button>
                    </div>
                    <div className='d-flex justify-content-center' style={{gap:'120px', fontSize:'larger', marginTop:'.5em'}}>
                        <button className='btn btn-outline-dark' onClick={() => setYear(year-1)}>Précédent</button>
                            {year}
                        <button className='btn btn-outline-dark' onClick={() => setYear(year+1)}>Suivant</button>
                    </div>
                </CardHeader>
                <CardBody>
                    <div className='row justify-content-center'>
                        { days.map((el, index) =>  // Affichage de la ligne des noms des jours
                            <div 
                                key={index}
                                className='col-sm-1'
                                style={{textAlign:'center'}}
                            >
                                {el}
                            </div>)
                        }
                    </div>
                    <div>
                        { currentMonth.map((el, index) => { 
                            return <div className={`row line-${index}`} key={index}>
                                {el.map((day, index) => {
                                    let dayTmp = new Date(`${year}-${month}-${day}`)
                                    if ((dayTmp.getDate() === date.getDate()) && 
                                        (dayTmp.getMonth() === date.getMonth()) && 
                                        (dayTmp.getFullYear() === date.getFullYear())) {
                                            if(obtenirRdvs(dayTmp).length !== 0){
                                                return <NavLink key={index} 
                                                className='col-sm-1 number-filled' 
                                                onClick={() => toggleModalRDV() }>
                                                    {day}
                                                </NavLink>
                                            } else{
                                                return <NavLink key={index} 
                                                className='col-sm-1 number-today' 
                                                onClick={() => {dayClicked(day) ; toggleModal() } }>
                                                    {day}
                                                </NavLink>
                                            }
                                    } else{
                                        if(obtenirRdvs(dayTmp).length !== 0){
                                            return <NavLink key={index} 
                                            className='col-sm-1 number-filled' 
                                            onClick={() => toggleModalRDV() }>
                                                {day}
                                            </NavLink>
                                        }
                                    }
                                    return <NavLink key={index}
                                    className='col-sm-1 number'
                                    onClick={() => {dayClicked(day) ; toggleModal() } }>
                                        {day}
                                    </NavLink>
                                }) }
                            </div>
                            })
                        }
                    </div>
                </CardBody>
           </Card>
           <FormModal isOpen={toggle} toggle={toggleModal} daySelected={dayOnClicked}/>
           <RDVModal isOpenRDV={toggleRDV} toggleRDV={toggleModalRDV} toggle={toggleModal} isOpen={toggle} daySelected={dayOnClicked}/>
        </div>
    );
}

export default Calendar;