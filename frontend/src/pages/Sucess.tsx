import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SuccessPage = () => {
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const paymentId = params.get('paymentId');
        const token = params.get('token');
        const payerId = params.get('PayerID');

        // Optionally, you can use these parameters to verify or display transaction details
        console.log('Payment ID:', paymentId);
        console.log('Token:', token);
        console.log('Payer ID:', payerId);
    }, [location]);

    return (
        <div>
            <h1>Payment Successful!</h1>
            <p>Thank you for your payment.</p>
        </div>
    );
};

export default SuccessPage;
