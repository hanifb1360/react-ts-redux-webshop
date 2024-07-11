// supabase/functions/sendOrderConfirmation.js

import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with the URL and anon key
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Lambda function handler to process the order confirmation email
exports.handler = async (event) => {
  // Parse the orderId and userId from the event body
  const { orderId, userId } = JSON.parse(event.body);

  // Fetch user email based on userId from the users table
  const { data: user, error: userError } = await supabase
    .from('users')
    .select('email')
    .eq('id', userId)
    .single();

  // Handle error in fetching user email
  if (userError) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: userError.message }),
    };
  }

  // Fetch order details based on orderId from the orders table
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .single();

  // Handle error in fetching order details
  if (orderError) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: orderError.message }),
    };
  }

  // Logic to send email using a service like SendGrid or Nodemailer
  // ...
  // Example (commented out):
  // const msg = {
  //   to: user.email,
  //   from: 'your-email@example.com',
  //   subject: 'Order Confirmation',
  //   text: `Your order with ID ${order.id} has been confirmed.`,
  //   html: `<strong>Your order with ID ${order.id} has been confirmed.</strong>`,
  // };
  // await sendEmail(msg);

  // Return success response if email is sent successfully
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Email sent successfully!' }),
  };
};

