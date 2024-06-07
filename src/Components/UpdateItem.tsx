import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import productContext from '../ProductsContext/productContext';

interface productDetailsProps {
    title: string,
    description: string,
    images: string[],
    thumbnail: string
}
interface contextProps {
    handleGetDetails: (id: number) => Promise<productDetailsProps | null>;
    handleUpdate: (id: number, title: string, desc: string, file: File) => Promise<null | undefined>;
}

const UpdateItem = () => {
    const { id } = useParams()
    const navigate  = useNavigate()

    const context = useContext(productContext)
    const { handleGetDetails, handleUpdate }: contextProps = context 

    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [image, setImage] = useState<File | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        getDetails()
    }, [])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
        }
    };

    const getDetails = async () => {
        setLoading(true)
        const res: productDetailsProps | null = await handleGetDetails(Number(id))
        if(res === null) {
            alert("Session expired! Please login again.")
            navigate('/login')
        }
        else {
            setTitle(res.title)
            setDescription(res.description)
            setImage(null)
        }
        setLoading(false)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const val = confirm('Are you sure to updated.')
        if(val === true) {
            setLoading(true)
            const res = await handleUpdate(Number(id), title, description, image !);
            if(res === null) {
                alert('Item update failed')
                navigate('/login')
            }
            else {
                alert("Item updated Successfully")
                navigate('/')
            }
            setLoading(false)
        }

    }
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <div className='container border border-black border-2 rounded mt-5 p-4'>
                <h1 className='text-center m-2'>Update product item.</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="validationDefault01" className="form-label fs-3">Product Title</label>
                        <input type="text" className="form-control form-control-lg  border-black" id="validationDefault01" aria-describedby="emailHelp" onChange={(e) => setTitle(e.target.value)} value={title} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label fs-3">Product Description</label>
                        <textarea className="form-control form-control-lg border-black" id="exampleFormControlTextarea1" rows={3} value={description} onChange={(e) => setDescription(e.target.value)}  required></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label fs-3">Upload Product Image</label>
                        <input type="file" name="" id="" className='form-control form-control-lg border-black' onChange={handleFileChange} />
                    </div>
                    <div className='d-flex justify-content-between mt-5'>
                        <button type="button" className="btn btn-primary fs-3" onClick={() => navigate('/')}>Go Back</button>
                        <button type="submit" className="btn btn-success fs-3">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UpdateItem
