import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import productContext from '../ProductsContext/productContext';
import Loader from './Loader';
import { toast } from 'react-toastify';

interface productDetailsProps {
    title: string,
    description: string,
    images: string[],
    thumbnail: string,
    brand: string,
    category: string,
    price: string,
    rating: string
}
interface contextProps {
    handleGetDetails: (id: number) => Promise<productDetailsProps | null>;
    handleUpdate: (id: number, title: string, desc: string, file: File, thumbnail: File, rating: string, brand: string, category: string, price: string) => Promise<null | undefined>;
}

const UpdateItem = () => {
    const { id } = useParams()
    const navigate  = useNavigate()

    const context = useContext(productContext)
    const { handleGetDetails, handleUpdate }: contextProps = context 

    const [loading, setLoading] = useState<boolean>(false)

    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [image, setImage] = useState<File | null>(null)
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [price, setPrice] = useState<string>("");
    const [rating, setRating] = useState<string>("");
    const [brand, setBrand] = useState<string>("");
    const [category, setCategory] = useState<string>("");

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
            toast.error("Session expired! Please login again.")
            navigate('/login')
        }
        else {
            setTitle(res.title)
            setDescription(res.description)
            setImage(null)
            setBrand(res.brand)
            setRating(res.rating)
            setCategory(res.category)
            setPrice(res.price)
            setThumbnail(null)
        }
        setLoading(false)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const val = confirm('Are you sure want to update ?')
        if(val === true) {
            setLoading(true)
            const res = await handleUpdate(Number(id), title, description, image !, thumbnail !, rating, brand, category, price);
            if(res === null) {
                toast.info('Item update canceled!', {
                    position: "bottom-right",
                })
                navigate('/login')
            }
            else {
                toast.success("Item updated Successfully", {
                    position: "bottom-right",
                })
                navigate('/home')
            }
            setLoading(false)
        }

    }
    const handleFileChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(file) {
            setThumbnail(file)
        }
    };
    if (loading) {
        return <Loader />;
    }
    return (
        <div className='container border border-black border-2 rounded my-5 p-4'>
            <h1 className='text-center m-2'>Update product item.</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="validationDefault01" className="form-label fs-3">Product Title</label>
                    <input type="text" className="form-control form-control-lg  border-black" id="validationDefault01" aria-describedby="emailHelp" onChange={(e) => setTitle(e.target.value)} value={title} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label fs-3">Product Description</label>
                    <textarea className="form-control form-control-lg border-black" id="exampleFormControlTextarea1" rows={3} onChange={(e) => setDescription(e.target.value)} value={description} required></textarea>
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
                    <input type="file" name="" id="" className='form-control form-control-lg border-black' onChange={handleFileChange2} />
                </div>
                <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea2" className="form-label fs-3">Upload Product Image</label>
                    <input type="file" name="" id="" className='form-control form-control-lg border-black' onChange={handleFileChange} />
                </div>
                <div className='d-flex justify-content-between mt-5'>
                    <button type="button" className="btn btn-primary fs-3" onClick={() => navigate('/home')}>Go Back</button>
                    <button type="submit" className="btn btn-success fs-3">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default UpdateItem
