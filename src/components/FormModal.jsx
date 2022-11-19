import { Modal, ModalBody, ModalHeader, ModalFooter, FormGroup, Input, Label, Button, Col, Row } from "reactstrap";
import { SaverContext } from "../context/useSave";
import { useContext, useRef } from "react";

//Composant responsable de l'affchage du formulaire de prise de rendez-vous
const FormModal = ({toggle, isOpen, daySelected}) => {

    const {rdvs, ajouterRdv} = useContext(SaverContext)
    const titreRef = useRef()
    const commentaireRef = useRef()

    const addToContext = (e) => {
        e.preventDefault()

        const rdv = {
            id: rdvs.length,
            date: daySelected,
            title: titreRef.current.value,
            comment: commentaireRef.current.value
        }
        
        ajouterRdv(rdv)
        toggle(!isOpen)
    }

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>
                Rendez-vous pour le {`${daySelected?.getDate()}/${daySelected?.getMonth()+1}/${daySelected?.getFullYear()}`}
            </ModalHeader>
            <ModalBody>
                <Row>
                    <Col sm='12'>
                        <FormGroup>
                            <Label htmlFor="notes">Titre</Label>
                            <Input id='notes' placeholder="Saisir titre..." innerRef={titreRef}/>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="com">Commentaire</Label>
                            <Input id='com' type="textarea" placeholder="Saisir commentaire..." innerRef={commentaireRef}/>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="date">Date du rendez-vous</Label>{' :  '}
                            {`${daySelected?.getDate()}/${daySelected?.getMonth()+1}/${daySelected?.getFullYear()}`}
                        </FormGroup>
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button color='primary' onClick={(e) => addToContext(e)}>Enregistrer</Button>
            </ModalFooter>
        </Modal>
    );
}

export default FormModal;