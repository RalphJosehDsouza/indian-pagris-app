from motor.motor_asyncio import AsyncIOMotorClient
import asyncio

async def test_mongodb_connection():
    try:
        client = AsyncIOMotorClient('mongodb://localhost:27017')
        
        server_info = await client.server_info()
        print("Successfully connected to MongoDB!")
        print(f"Server version: {server_info['version']}")
        
        db = client.pagdi_db
        collections = await db.list_collection_names()
        print("\nAvailable collections:")
        for collection in collections:
            print(f"- {collection}")
        
        test_doc = {"test": "connection"}
        result = await db.test_collection.insert_one(test_doc)
        print(f"\nInserted test document with ID: {result.inserted_id}")
        
        await db.test_collection.delete_one({"test": "connection"})
        print("Cleaned up test document")
        
        print("\nAll tests passed successfully!")
        
    except Exception as e:
        print(f"Error connecting to MongoDB: {str(e)}")
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(test_mongodb_connection()) 