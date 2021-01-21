const AWS = require('aws-sdk')
const dynamoDB = new AWS.DynamoDB({ region: 'us-west-2', apiVersion: '2012-08-10' })
const s3 = new AWS.S3({
    accessKeyId: 'AKIAYG3V2KGCGA23X5GC',
    secretAccessKey: '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'
});

exports.handler = (event, context, cb) => {

    const params = {
        TableName: 'eBooks'
    }

    dynamoDB.scan(params, (err, data) => {
        if (err) {
            console.log(err)
            cb(err)
        }
        else {
            let retrieveContentCounter = 0;
            const unmarshalledData = data.Items.map(el => {
                return AWS.DynamoDB.Converter.unmarshall(el)
            })

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
    })
};
