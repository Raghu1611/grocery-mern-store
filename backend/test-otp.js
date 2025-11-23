const axios = require('axios');

async function testOTP() {
    try {
        console.log('🧪 Testing OTP API...\n');

        // Step 1: Send OTP
        console.log('📧 Step 1: Sending OTP...');
        const sendResponse = await axios.post('http://localhost:5000/api/auth/send-otp', {
            email: '2200032009cseh@gmail.com'
        });

        console.log('✅ Response:', JSON.stringify(sendResponse.data, null, 2));

        if (sendResponse.data.otp) {
            const otp = sendResponse.data.otp;
            console.log('\n🔑 OTP Received:', otp);

            // Step 2: Verify OTP
            console.log('\n🔍 Step 2: Verifying OTP...');
            const verifyResponse = await axios.post('http://localhost:5000/api/auth/verify-otp', {
                email: '2200032009cseh@gmail.com',
                otp: otp
            });

            console.log('✅ Verify Response:', JSON.stringify(verifyResponse.data, null, 2));

            // Step 3: Reset Password
            console.log('\n🔐 Step 3: Resetting Password...');
            const resetResponse = await axios.post('http://localhost:5000/api/auth/reset-password', {
                email: '2200032009cseh@gmail.com',
                otp: otp,
                password: 'newpassword123'
            });

            console.log('✅ Reset Response:', JSON.stringify(resetResponse.data, null, 2));
            console.log('\n🎉 All tests passed!');
        }

    } catch (error) {
        console.error('❌ Error:', error.response?.data || error.message);
    }
}

testOTP();
