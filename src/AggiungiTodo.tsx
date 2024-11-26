import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const Aggiungitodo = () => {
    const navigate = useNavigate()
    type ErrorType = {
        titolo?: string,
        desrizione?: string,
        priorita?: string
    }


    type Priority = {
        id: number,
        descrizione: string
    }

    type FormData = {
        "descrizione": string,
        "titolo": string,
        "priorita"?: Priority
    }


    const [error, setError] = useState<ErrorType>()
    const [priorita, setPriorita] = useState<Priority[]>([])
    const [formData, setFormData] = useState<FormData>({ descrizione: '', titolo: '' })



    const priorities = async () => {
        try {
            const response = await fetch('http://localhost:8081/priorities')
            const data: Priority[] = await response.json()
            setPriorita(data)
        } catch (e) {
            console.log(e);
        }
    }

    const send = async () => {
        const message: string = 'Dato obbligatorio'
        let error: ErrorType = {}

        if (!formData.titolo) { error = { ...error, titolo: message }; }
        if (!formData.descrizione) { error = { ...error, desrizione: message }; }
        if (!formData.priorita) { error = { ...error, priorita: message }; }


        setError(error)
        if (error.desrizione || error.titolo || error.priorita) {
            return;
        }


        try {
            await fetch('http://localhost:8081/todo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            navigate('/')
        } catch (e) {
            console.log(e);
        }
    }


    useEffect(() => {
        priorities()
    }, [])

    return (
        <div className="container">
            <div className="card shadow mt-4">
                <div className="row">
                    <div className="col-3">
                        <button className="btn btn-dark btn-sm mt-3 ms-2" onClick={() => navigate('/')}>torna alla lista</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 text-center"><h5>Inserisci Todo</h5></div>
                    <div className="col-12"><hr /></div>
                    <div className="col-md-6 col-12 mt-3 ps-4 pe-4 mb-2">
                        <label htmlFor="titolo" className="pb-2">Titolo:<span className="text-danger">*</span></label>
                        <input onChange={(e) => setFormData({ ...formData, titolo: e.currentTarget.value })} id="titolo" type="text" className="form-control" placeholder="Inserisci..." />
                        {error && error.titolo && <small className="text-danger fst-italic">{error.titolo}</small>}
                    </div>

                    <div className="col-md-6 col-12 mt-3 ps-4 pe-4 mb-2">
                        <label htmlFor="Prorità" className="pb-2">Prorità:<span className="text-danger">*</span></label>
                        <select
                            id="Prorità"
                            className="form-control"
                            onChange={(e) => {
                                const prioritaSel = priorita.find(el => el.id == parseInt(e.currentTarget.value))
                                let data: FormData = { ...formData }
                                data = { ...data, priorita: prioritaSel }
                                setFormData(data)
                            }}
                        >
                            <option>Scegli...</option>
                            {priorita.map(pr => <option value={pr.id}>{pr.descrizione}</option>)}
                        </select>
                        {error && error.priorita && <small className="text-danger fst-italic">{error.priorita}</small>}
                    </div>
                    <div className="col-md-12 col-12 mt-3 ps-4 pe-4 mb-2">
                        <label htmlFor="descrizione" className="pb-2">Descrizione:<span className="text-danger">*</span></label>
                        <textarea onChange={(e) => setFormData({ ...formData, descrizione: e.currentTarget.value })} id="descrizione" className="form-control" placeholder="Inserisci..." />
                        {error && error.desrizione && <small className="text-danger fst-italic">{error.desrizione}</small>}
                    </div>
                    <div className="col-12 text-center mt-4">
                        <button onClick={send} className="btn btn-dark btn-sm mb-2">Aggiungi task</button>
                    </div>
                </div>
            </div>
        </div>)
}