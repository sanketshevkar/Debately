import pymongo

#mongo_uri = "mongodb://username:" + urllib.quote("p@ssword") + "@127.0.0.1:27001/"
#client = pymongo.MongoClient(mongo_uri)
import urllib.parse

def connectMongoClient():
    CONNECTION_STRING = "mongodb+srv://Aaryan:"+urllib.parse.quote_plus('Test@123')+"@cluster0.oza2b.mongodb.net/test?retryWrites=true&w=majority"
    client = pymongo.MongoClient(CONNECTION_STRING)
    db = client.get_database('test')
    print('DB connected')
    return db

if __name__ == '__main__':  
    connectMongoClient()


        