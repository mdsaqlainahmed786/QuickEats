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
//   useEffect(() => {
//     const paymentId = searchParams.get('paymentId')
//     const token = searchParams.get('token')
//     const payerId = searchParams.get('PayerID')

//     setPaymentDetails({ paymentId, token, payerId })

//     // Optionally, you can use these parameters to verify or display transaction details
//     console.log('Payment ID:', paymentId)
//     console.log('Token:', token)
//     console.log('Payer ID:', payerId)
//   }, [searchParams])

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 size-16 rounded-full bg-red-100 p-2 text-red-600">
            <CheckCircle className="size-12" />
          </div>
          <CardTitle className="text-2xl font-bold text-red-700">Payment Successful!</CardTitle>
          <CardDescription className="text-red-600">
            Thank you for your payment. Your transaction has been completed.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-red-50 p-4 text-sm text-red-800">
            <p><strong>Payment ID:</strong> {paymentDetails.paymentId}</p>
            <p><strong>Payer ID:</strong> {paymentDetails.payerId}</p>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            A confirmation email has been sent to your registered email address.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link to="/">
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              Return to Home
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}