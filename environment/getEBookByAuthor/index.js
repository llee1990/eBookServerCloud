const AWS = require('aws-sdk')
const dynamoDB = new AWS.DynamoDB({ region: 'us-west-2', apiVersion: '2012-08-10' })
const s3 = new AWS.S3({
    accessKeyId: 'AKIAYG3V2KGCGA23X5GC',
    secretAccessKey: '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'
});

exports.handler = (event, context, cb) => {
    const author = decodeURI(event.pathParameters.author);
    const params = {
        TableName: 'eBooks',
        FilterExpression: "author = :a",
        ExpressionAttributeValues: {
            ":a": {
                S: author
            }
        },
    }
    dynamoDB.scan(params, (err, data) => {
        if (err) {
            console.log(err)
            cb(err)
        }
        else {
            const unmarshalledData = data.Items.map(el => {
                return AWS.DynamoDB.Converter.unmarshall(el)
            })
            if (unmarshalledData.length == 0) {
                const response_err = {
                "statusCode": 400,
                "body": JSON.stringify({"message": "There are no books by that author"}),
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true
                }

            };
                cb(null, response_err)
            } else {
                let retrieveContentCounter = 0;
                unmarshalledData.forEach(ebook => {
                    const s3params = {
                        Bucket: 'ebookservicescontents',
                        Key: `${ebook.id}.txt`
                    };
                    s3.getObject(s3params, (err, s3file) => {
                        if (err) {
                            console.log(err);
                        }
                        const text = s3file.Body.toString();
                        ebook.content = text;
                        retrieveContentCounter++;

                        if (retrieveContentCounter === unmarshalledData.length) {
                            const response = {
                                "isBase64Encoded": true,
                                "statusCode": 200,
                                "body": JSON.stringify(unmarshalledData),
                                "headers": {
                                    "Access-Control-Allow-Origin": "*",
                                    "Access-Control-Allow-Credentials": true
                                }
                            };

                            console.log(response)
                            cb(null, response)
                        }
                    })
                })
            }
        }
    })
};
