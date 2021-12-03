import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoaddingComponent";
import { useAppDispatch } from "../../app/store/configureStore";
import { setBasket } from "../baskets/basketSlice";
import CheckoutPage from "./CheckOutPage";

const stripePromise = loadStripe('pk_test_51K1PdMJF6LB4cTj7UbJxXFXWbVEIljVtAeKHNfCGBAbMfLIFuXjqkLr7OkXAt0GoBSN8FBYTLeVbUSKIjpxyiTqe00An9ORPMN')

export default function CheckoutWrapper(){
    const dispatch = useAppDispatch();
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        agent.Payments.createPaymentIntent()
         .then(basket => dispatch(setBasket(basket))) 
         .catch(error => console.log(error))
         .finally(()=>setLoading(false))
    },[dispatch]);
    
    if(loading) return <LoadingComponent message='Loading checkout....'/>

    return (
        <Elements stripe={stripePromise}>
            <CheckoutPage />
        </Elements>
    )
}