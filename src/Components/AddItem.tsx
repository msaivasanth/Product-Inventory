import React, { useContext, useState } from 'react';
import productContext from '../ProductsContext/productContext';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import { toast } from 'react-toastify';

interface AddItemProps {
    handleAddItem: (title: string, desc: string, price: string, rating: string, brand: string, category: string, thumbnail: File, file: File) => Promise<null | undefined>;
    loading: boolean;
}
const AddItem = () => {
    const [title, setTitle] = useState<string>("");
    const [desc, setDesc] = useState<string>("");
    const [image, setImage] = useState<File | null>(null);
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [price, setPrice] = useState<string>("");
    const [rating, setRating] = useState<string>("");
    const [brand, setBrand] = useState<string>("");
    const [category, setCategory] = useState<string>("");

    const context = useContext(productContext)
    const { handleAddItem, loading}: AddItemProps = context

    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!title || !desc || !image || !price || !rating || !thumbnail || !brand || !category) {
            toast.info('Please Enter all the details.')
        }
        else {
            const res = await handleAddItem(title, desc, price, rating, brand, category, thumbnail, image)
            if(res === null) {
                toast.error("Session expired! Please login again.", {
                    theme: "colored"
                })
                navigate('/login')
            }
            else {
                setTitle('');
                setDesc('');
                setImage(null)
                navigate('/home')
                toast.success('Your item is added, scroll down to view', {
                    position: "bottom-right",
                    theme: "colored"
                })
            }
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(file) {
            setImage(file)
        }
    };

    const handleFileChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(file) {
            setThumbnail(file)
        }
    };

    if (loading) return <Loader />
    return (
        <div className='container border border-black border-2 rounded my-5 p-4'>
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
               
                <div className="row">
                    <div className="col-6 mb-3">
                        <label htmlFor="price" className="form-label fs-3">Price</label>
                        <input type="string" className="form-control form-control-lg  border-black" id="price" aria-describedby="emailHelp" value={price} onChange={(e) => setPrice(e.target.value)} required/>
                    </div>
                    <div className="col-6 mb-3">
                        <label htmlFor="rating" className="form-label fs-3">Rating</label>
                        <input type="string" step={0.01} className="form-control form-control-lg  border-black" id="rating" aria-describedby="emailHelp" value={rating} onChange={(e) => setRating(e.target.value)}  required/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6 mb-3">
                        <label htmlFor="price" className="form-label fs-3">Brand</label>
                        <input type="string" className="form-control form-control-lg  border-black" id="price" aria-describedby="emailHelp" value={brand} onChange={(e) => setBrand(e.target.value)} required/>
                    </div>
                    <div className="col-6 mb-3">
                        <label htmlFor="rating" className="form-label fs-3">Category</label>
                        <input type="string" step={0.01} className="form-control form-control-lg  border-black" id="rating" aria-describedby="emailHelp" value={category} onChange={(e) => setCategory(e.target.value)}  required/>
                    </div>
                </div>
                <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label fs-3">Upload Thumbnail Image</label>
                    <input type="file" name="" id="" className='form-control form-control-lg border-black' onChange={handleFileChange2} required/>
                </div>
                <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea2" className="form-label fs-3">Upload Product Image</label>
                    <input type="file" name="" id="" className='form-control form-control-lg border-black' onChange={handleFileChange} required/>
                </div>
                <div className='d-flex justify-content-between mt-5'>
                    <button type="button" className="btn btn-primary fs-3" onClick={() => navigate('/home')}>Go Back</button>
                    <button type="submit" className="btn btn-success fs-3">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default AddItem;