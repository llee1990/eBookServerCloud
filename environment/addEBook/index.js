const uuid = require('uuid');
const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB({ region: 'us-west-2', apiVersion: '2012-08-10' });
const s3 = new AWS.S3({
    accessKeyId: 'AKIAYG3V2KGCGA23X5GC',
    secretAccessKey: '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'
});

exports.handler = (event, context, cb) => {
    let body = JSON.parse(event.body);
    // let body = event.body;
    let bookID = uuid.v4();

    // Setting up S3 upload parameters
    const s3params = {
        Bucket: 'ebookservicescontents',
        Key: `${bookID}.txt`,
        Body: body.content
    };

    // Uploading files to the bucket
    s3.upload(s3params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
    
    const params = {
        Item: {
            "id": {
                S: bookID
            },
            "title": {
                S: body.title
            },
            "author": {
                S: body.author
            },
            "genre": {
                S: body.genre
            },
            "year": {
                N: `${body.year}`
            }
        },
        ReturnConsumedCapacity: "TOTAL",
        TableName: "eBooks"
    };
    dynamoDB.putItem(params, function(err, data) {
        if (err) cb(err); // an error occurred
        else {
            const response = {
                "statusCode": 200,
                "body": JSON.stringify(data),
                "headers": {
                    "Access-Control-Allow-Origin": "*",
	                "Access-Control-Allow-Credentials": true
                }

            };

            console.log(response)
            cb(null, response) // successful response
        }
    });
};
