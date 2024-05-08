import React, { ChangeEventHandler, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import productContext from '../ProductsContext/productContext';

interface contextProps {
    search: string,
    setSearch: (search: string) => void,
    handleSearch: (search: string) => Promise<null | undefined>
    searchSuggestions: (search: string) => Product[] | undefined
}

interface Product {
    id: number;
    title: string;
    description: string;
    thumbnail: string;
    images: string[];
}

const Search = () => {
    const context = useContext(productContext);
    const { search, setSearch, handleSearch, searchSuggestions }: contextProps = context
    const navigate = useNavigate()

    const [sugg, setSugg] = useState<Product[] | undefined>([])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (search === '') {
            alert("Enter something to search")
        }
        else {
            const res = await handleSearch(search);
            if (res === null) navigate('/login')
        }
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
        const value1 = e.target.value;
        const suggestions = searchSuggestions(value1)
        setSugg(suggestions?.slice(0, 10))
    }
    return (
        <>
            <div>
                <form className="d-flex" role="search" onSubmit={handleSubmit}>
                    <div className="dropdown">
                        <input className="form-control me-2"  placeholder="Search" aria-label="Search" onChange={(e) => handleChange(e)} data-bs-toggle="dropdown" value={search} />

                        <ul className="dropdown-menu">
                            {!search && <div className='text-center'>Enter something...</div>}
                            {sugg && sugg?.map((product: Product) => {
                                return <li><a className="dropdown-item" onClick={() => {setSearch(product.title)}} href='#'>{product.title}</a></li>
                            })}
                        </ul>
                    </div>
                    <button className="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
        </>
    )
}

export default Search