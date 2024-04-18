import React, { useContext, useState } from 'react';
import productContext from '../ProductsContext/productContext';
import { useNavigate } from 'react-router-dom';

interface AddItemProps {
    handleAddItem: (title: string, desc: string, file: File) => Promise<null | undefined>;
    loading: boolean;
}
const AddItem = () => {
    const [title, setTitle] = useState<string>("");
    const [desc, setDesc] = useState<string>("");
    const [image, setImage] = useState<File | null>(null);

    const context = useContext(productContext)
    const { handleAddItem, loading}: AddItemProps = context

    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!title || !desc || !image) {
            alert('Please Enter all the details.')
        }
        else {
            const res = await handleAddItem(title, desc, image)
            if(res === null) {
                navigate('/login')
            }
            else {
                setTitle('');
                setDesc('');
                setImage(null)
                navigate('/')
                alert('Your item is added, scroll down to view')
            }
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(file) {
            setImage(file)
        }
    };

    if (loading) return <div>Loading....</div>
    return (
        <div className='container border border-black border-2 rounded mt-5 p-4'>
            <h1 className='text-center m-2'>Add new product item.</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="validationDefault01" className="form-label fs-3">Product Title</label>
                    <input type="text" className="form-control form-control-lg  border-black" id="validationDefault01" aria-describedby="emailHelp" onChange={(e) => setTitle(e.target.value)} value={title} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label fs-3">Product Description</label>
                    <textarea className="form-control form-control-lg border-black" id="exampleFormControlTextarea1" rows={3} onChange={(e) => setDesc(e.target.value)} value={desc} required></textarea>
                </div>
                <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label fs-3">Upload Product Image</label>
                    <input type="file" name="" id="" className='form-control form-control-lg border-black' onChange={handleFileChange} required/>
                </div>
                <div className='d-flex justify-content-between mt-5'>
                    <button type="button" className="btn btn-primary fs-3" onClick={() => navigate('/')}>Go Back</button>
                    <button type="submit" className="btn btn-success fs-3">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default AddItem;
