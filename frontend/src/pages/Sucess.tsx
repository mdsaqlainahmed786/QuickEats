import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight } from 'lucide-react'

export default function SuccessPage() {
  const [paymentDetails, setPaymentDetails] = useState({
    paymentId: '',
    token: '',
    payerId: ''
  })

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const paymentId = params.get('paymentId');
    const token = params.get('token');
    const payerId = params.get('PayerID');
    setPaymentDetails({ 
      paymentId: paymentId || '', 
      token: token || '', 
      payerId: payerId || '' 
    });

    // Optionally, you can use these parameters to verify or display transaction details
    console.log('Payment ID:', paymentId);
    console.log('Token:', token);
    console.log('Payer ID:', payerId);
}, []);


  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-rose-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 size-16 rounded-full bg-orange-100 p-2 text-orange-600">
            <CheckCircle className="size-12" />
          </div>
          <CardTitle className="text-2xl font-bold text-orange-700">Payment Successful!</CardTitle>
          <CardDescription className="text-orange-600">
            Thank you for your payment. Your transaction has been completed.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-orange-50 p-4 text-sm text-orange-800">
            <p><strong>Payment ID:</strong> {paymentDetails.paymentId}</p>
            <p><strong>Payer ID:</strong> {paymentDetails.payerId}</p>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            A confirmation email has been sent to your registeorange email address.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link to="/">
            <Button className="bg-orange-600 hover:bg-orange-700 text-white">
              Return to Home
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}