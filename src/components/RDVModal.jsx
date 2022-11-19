import { SaverContext } from "../context/useSave";
import { useContext } from "react";
import { FormGroup, Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";

//Composant responsable de l'affchage de tous les rendez-vous pris pour 1 jour donné
const RDVModal = ({daySelected, toggle, isOpen, toggleRDV, isOpenRDV}) => {

    const {obtenirRdvs} = useContext(SaverContext)
    const rendezVous = obtenirRdvs(daySelected)

    return (
        <Modal isOpen={isOpenRDV} toggle={toggleRDV}>
            <ModalHeader toggle={toggleRDV}>
                Tous les rendez vous pris le {`${daySelected?.getDate()}/${daySelected?.getMonth()+1}/${daySelected?.getFullYear()}`}
            </ModalHeader>
            <ModalBody>
                {
                    rendezVous.map((element, index) => {
                        return <FormGroup key={index}>
                            <h2>{element.title}</h2>
                            <p>Commentaire : {' '}{element.comment}</p>
                        </FormGroup>
                    })
                }
            </ModalBody>
            <ModalFooter>
                <Button color='primary' onClick={() => toggle(!isOpen)}>Prendre un autre</Button>
            </ModalFooter>    
        </Modal>
    );
}

export default RDVModal;