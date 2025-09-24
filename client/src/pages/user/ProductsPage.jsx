import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api/api';
import ProductCard from '../components/ui/ProductCard';
import CategorySidebar from '../components/ui/CategorySidebar';
import SearchBar from '../components/ui/SearchBar';
import Pagination from '../components/ui/Pagination';

export default function ProductsPage(){
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState({ products: [], total:0, page:1, pages:1 });
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const qs = searchParams.toString();
      const res = await api.get(`/products?${qs}`);
      setData(res.data);
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchProducts(); }, [searchParams]);

  const updateParam = (key, value) => {
    const params = new URLSearchParams(searchParams);
    if (!value) params.delete(key);
    else params.set(key, value);
    setSearchParams(params);
  };

  return (
    <div className="container mt-4">
      <SearchBar initial={searchParams.get('keyword')||''} onSearch={(kw)=> updateParam('keyword', kw)} />
      <div className="row">
        <div className="col-md-3">
          <CategorySidebar selected={searchParams.get('category')} onSelect={(id)=> updateParam('category', id)} />
          {/* FiltersPanel can go here */}
        </div>
        <div className="col-md-9">
          <div className="d-flex justify-content-between mb-2">
            <select value={searchParams.get('sort')||''}
                    onChange={(e)=> updateParam('sort', e.target.value)}>
              <option value=''>Sort</option>
              <option value='priceAsc'>Price: Low to High</option>
              <option value='priceDesc'>Price: High to Low</option>
              <option value='newest'>Newest</option>
            </select>
          </div>

          {loading ? <p>Loading...</p> :
            <div className="row">
              {data.products.map(p => (
                <div className="col-md-4 mb-3" key={p._id}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          }

          <Pagination page={data.page} pages={data.pages} onPage={(p)=> updateParam('page', p)} />
        </div>
      </div>
    </div>
  );
}
