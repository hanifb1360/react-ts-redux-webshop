// supabase/functions/sendOrderConfirmation.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

exports.handler = async (event) => {
  const { orderId, userId } = JSON.parse(event.body);

  const { data: user, error: userError } = await supabase
    .from('users')
    .select('email')
    .eq('id', userId)
    .single();

  if (userError) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: userError.message }),
    };
  }

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .select('*')
    .eq('id', orderId)
    .single();

  if (orderError) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: orderError.message }),
    };
  }

  // Send email using a service like SendGrid or Nodemailer
  // ...

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Email sent successfully!' }),
  };
};
