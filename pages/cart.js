import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Button from "@/components/Button";
import axios from "axios";
import Table from "@/components/Table";
import Image from "next/image";
import Input from "@/components/input";

const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1.8fr 1.2fr;
    gap:30px;
    margin-top: 30px;

`
const Box = styled.div`
    background-color: #fff;
    border-radius: 10px;
    padding: 30px;
    max-height: fit-content;
`

export default function CartPage() {
    const {cartProducts, setCartProducts} = useContext(CartContext);
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [city,setCity] = useState('')
    const [postal,setPostal] = useState();
    const [addr, setAddr] = useState('');
    const [country,setCountry] = useState('');
    const [products, setProducts] = useState([]);
    const set = new Set();
    const [count, setCounts] = useState({});

    function processList(cartProducts){
        const counts = {}
        cartProducts.forEach((item) => {
            const id = item;
            counts[id] = (counts[id] || 0) + 1;
            set.add(id);
        });
        return counts;
    }

    useEffect(()=>{
        const newCounts = processList(cartProducts);
        setCounts(newCounts);
    },[cartProducts])

    useEffect(()=>{
        if(set.size > 0){
            axios.post('/api/cart', Array.from(set)).then(res => {
                setProducts(JSON.parse(res.data));
            }).catch(err => {
                console.error("err: " ,err);
            })
        }
    },[set]);

    const ProductInfoCell = styled.td`
        padding: 10px 0;
        text-transform: uppercase;
        font-weight: 500 ;

    `
    const ProductImageBox = styled.div`
        width: 130px;
        height: 100px;
        border: 1px solid rgba(0,0,0,0.1);
        border-radius: 10px;
        display: flex;
        justify-content: center;
        margin-left: auto;
        margin-right: auto;
        align-items: center;
        img{
            max-width: 140px;
            max-height:100px;
            border-radius: 10px;
        }
    `
    const CityHolder = styled.div`
        display: flex ;
        gap: 5px;
    `
    const StyledHeader = styled.h2`
        text-align: center;
    `
    const QuantityLabel = styled.span`
        padding: 0 15px;
        display: block;
        @media screen and (min-width: 768px) {
            display: inline-block;
            padding: 0 10px;
        }
    `

    function addOne(id){
        setCartProducts(prev => {
            const newList = [...prev, id];
            return newList;
        })
    }

    function subOne(id){
        if(cartProducts.length==1){
            localStorage?.setItem('cartProducts','');
            setCartProducts([]);
        }
        setCartProducts(prev => {
            const pos = prev.indexOf(id);
            if(pos !== -1) return prev.filter((value,index) => index !==pos);
            //if(i)newList.splice(i,1);
            return prev;
        })
    }

    let total = 0;
    for(const product of products ){
        total += product.price * count[product._id] ;
    }

    return(
        <div>
            <Header />
            <Center>
                <ColumnsWrapper>
                    <Box>
                        <StyledHeader>Cart</StyledHeader>
                        {cartProducts.length > 0 ?
                            (
                                <>
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>Product</th>
                                                <th>Quantity</th>
                                                <th>Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.length > 0 && (
                                                products.map((product) => (
                                                    <tr key={product._id}>
                                                        <ProductInfoCell>
                                                            <ProductImageBox>
                                                                <Image src={product?.images[0]} alt="img" height={150} width={200}/>
                                                            </ProductImageBox>
                                                            {product.title}
                                                        </ProductInfoCell>
                                                        <td>
                                                            <Button onClick={()=>subOne(product._id)}>-</Button>
                                                            <QuantityLabel>
                                                                {count[product._id] || 0}
                                                            </QuantityLabel>
                                                            <Button onClick={()=>addOne(product._id)}>+</Button>
                                                        </td>
                                                        <td>${product.price * count[product._id]}</td>
                                                    </tr>
                                                ))
                                            )}
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td style={{paddingTop:"5px"}}>${total}</td>
                                            </tr>

                                        </tbody>
                                    </Table>
                                </>
                            )
                            :
                            "No Products in Cart!" }
                    </Box>
                        {!!cartProducts.length && (
                            <Box>
                                <StyledHeader>Order Information</StyledHeader>
                                <form method="post" action="/api/checkout">
                                <Input type="text" name="name" placeholder="Name" value={name || ''} onChange={e=>setName(e.target.value)} />
                                <Input type="text" name="email" placeholder="Email" value={email || ''} onChange={e=>setEmail(e.target.value)} />
                            <CityHolder>
                                <Input type="text" name="city" placeholder="City" value={city || ''} onChange={e=>setCity(e.target.value)} />
                                <Input type="text" name="postal" placeholder="Postal-Code" value={postal || ''} onChange={e=>setPostal(e.target.value)} />
                            </CityHolder>
                                <Input type="text" name="addr" placeholder="Street Addr." value={addr || ''} onChange={e=>setAddr(e.target.value)} />
                                <Input type="text" name="country" placeholder="Country" value={country || ''} onChange={e=>setCountry(e.target.value)} />
                                <input type="hidden" name="products" value={cartProducts.join(',')} />
                                <Button black block types="submit">Continue to Payment</Button>
                                </form>
                            </Box>
                             )}
                </ColumnsWrapper>
            </Center>
        </div>
    );
}