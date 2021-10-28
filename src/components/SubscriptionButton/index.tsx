import { signIn, useSession } from 'next-auth/client';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from './style.module.scss';

interface SubButtonProps {
    priceId: string;
}

export function SubButton({priceId}:SubButtonProps){
    const [session] = useSession()

    async function handleSubscribe(){
        if (!session) {
            signIn('github')
            return;
        } 

        try{
            const response = await api.post('/subsSection')

            const [sessionId] = response.data
            
            const stripe = await getStripeJs()

            stripe.redirectToCheckout({sessionId})
        } catch (err){
            alert(err.message);
        }
    };

    return(
        <button 
        type="button" 
        className={styles.subButton}
        onClick={handleSubscribe}
        >
            Subscribe now
        </button>
    )
}