import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import productContext from '../ProductsContext/productContext';

interface contextProps {
    search: string,
    setSearch: (search: string) => void,
    handleSearch: (search: string) => Promise<null | undefined>
}
const Search = () => {
    const context = useContext(productContext);
    const { search, setSearch, handleSearch }: contextProps = context
    const navigate = useNavigate()

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
    return (
        <div>
            <form className="d-flex" role="search" onSubmit={handleSubmit}>
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setSearch(e.target.value)} />
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
        </div>
    )
}

export default Search
