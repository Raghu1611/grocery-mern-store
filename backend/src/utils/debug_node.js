console.log('Node is working');
try {
    require('resend');
    console.log('Resend package found');
} catch (e) {
    console.log('Resend package NOT found');
}
