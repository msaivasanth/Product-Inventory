import React, { useContext, useState } from 'react';
import productContext from '../ProductsContext/productContext';
import { useNavigate } from 'react-router-dom';


const AddItem = () => {
    const [title, setTitle] = useState<string>("");
    const [desc, setDesc] = useState<string>("");

    const context = useContext(productContext)
    const { handleAddItem }: any = context
    const navigate = useNavigate()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleAddItem(title, desc)

        setTitle('');
        setDesc('');
        navigate('/')
        alert('Product Added successfuly, please scroll down to see added item')
    };


    return (
        <div className='container'>
            <h1 className='text-center my-3'>Add Item......</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label fs-3">Product Title</label>
                    <input type="text" className="form-control form-control-lg" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setTitle(e.target.value)} value={title} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label fs-3">Product Description</label>
                    <textarea className="form-control form-control-lg" id="exampleFormControlTextarea1" rows={3} onChange={(e) => setDesc(e.target.value)} value={desc}></textarea>
                </div>
                <button type="submit" className="btn btn-primary fs-3">Submit</button>
            </form>
        </div>
    );
};

export default AddItem;
