from motor.motor_asyncio import AsyncIOMotorClient
import asyncio
import os
from dotenv import load_dotenv

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")

pagris = [
    {
        "name": "Rajasthani Safa",
        "region": "Rajasthan",
        "description": "Traditional ceremonial turban of Rajasthan, known for its distinctive style and durability.",
        "historical_significance": "Symbol of Rajput pride and valor, worn during royal ceremonies and festivals.",
        "cultural_value": "Represents the rich cultural heritage of Rajasthan and its royal traditions.",
        "tying_instructions": [
            "Start with a long piece of cloth",
            "Create a base layer around the head",
            "Form pleats at the back",
            "Secure with decorative pins",
            "Add gold embroidery details"
        ],
        "image_url": "https://example.com/rajasthani-safa.jpg"
    },
    {
        "name": "Sikh Dastar",
        "region": "Punjab",
        "description": "Traditional turban worn by Sikh men, representing their religious and cultural identity.",
        "historical_significance": "Symbol of Sikh faith and equality, established by Guru Gobind Singh Ji.",
        "cultural_value": "Essential part of Sikh identity and religious practice.",
        "tying_instructions": [
            "Begin with a long piece of cloth",
            "Create multiple layers",
            "Form pleats at the front",
            "Secure with traditional knots",
            "Add decorative elements"
        ],
        "image_url": "https://example.com/sikh-dastar.jpg"
    },
    {
        "name": "Mysore Peta",
        "region": "Karnataka",
        "description": "Traditional ceremonial turban of Mysore, worn during royal ceremonies and cultural events.",
        "historical_significance": "Symbol of Mysore's royal heritage and cultural pride.",
        "cultural_value": "Represents the rich cultural heritage of Karnataka and its royal traditions.",
        "tying_instructions": [
            "Start with a long piece of silk cloth",
            "Create a base layer around the head",
            "Form pleats at the back",
            "Secure with decorative pins",
            "Add gold embroidery details"
        ],
        "image_url": "https://example.com/mysore-peta.jpg"
    },
    {
        "name": "Bikaneri Pagri",
        "region": "Rajasthan",
        "description": "Traditional turban from Bikaner, known for its distinctive style and durability.",
        "historical_significance": "Worn by the royal family of Bikaner and their courtiers.",
        "cultural_value": "Symbolizes the desert culture and royal heritage of Bikaner.",
        "tying_instructions": [
            "Begin with a thick cotton cloth",
            "Create multiple layers for protection",
            "Form a distinctive peak at the front",
            "Secure with traditional knots",
            "Add decorative elements"
        ],
        "image_url": "https://example.com/bikaneri-pagri.jpg"
    },
    {
        "name": "Kerala Mundu",
        "region": "Kerala",
        "description": "Traditional headgear worn during temple ceremonies and cultural events.",
        "historical_significance": "Part of Kerala's temple traditions and cultural ceremonies.",
        "cultural_value": "Represents the spiritual and cultural heritage of Kerala.",
        "tying_instructions": [
            "Use white cotton cloth",
            "Create a simple base layer",
            "Form pleats at the back",
            "Secure with traditional knots",
            "Add temple flower decorations"
        ],
        "image_url": "https://example.com/kerala-mundu.jpg"
    },
    {
        "name": "Hyderabadi Pagri",
        "region": "Telangana",
        "description": "Elegant turban style from Hyderabad, known for its sophisticated look.",
        "historical_significance": "Associated with the Nizams of Hyderabad and their court culture.",
        "cultural_value": "Symbolizes the rich cultural heritage of Hyderabad.",
        "tying_instructions": [
            "Start with silk or cotton cloth",
            "Create a structured base",
            "Form elegant pleats",
            "Secure with decorative pins",
            "Add pearl or gem decorations"
        ],
        "image_url": "https://example.com/hyderabadi-pagri.jpg"
    },
    {
        "name": "Gujarati Pagri",
        "region": "Gujarat",
        "description": "Traditional turban style from Gujarat, worn during festivals and ceremonies.",
        "historical_significance": "Part of Gujarat's cultural and religious traditions.",
        "cultural_value": "Represents the vibrant culture of Gujarat.",
        "tying_instructions": [
            "Use colorful cotton cloth",
            "Create a structured base",
            "Form decorative pleats",
            "Secure with traditional knots",
            "Add mirror work or embroidery"
        ],
        "image_url": "https://example.com/gujarati-pagri.jpg"
    },
    {
        "name": "Kashmiri Pagri",
        "region": "Jammu and Kashmir",
        "description": "Traditional headgear from Kashmir, known for its warmth and elegance.",
        "historical_significance": "Worn by Kashmiri Pundits and Muslim scholars.",
        "cultural_value": "Symbolizes the cultural heritage of Kashmir.",
        "tying_instructions": [
            "Use woolen cloth",
            "Create a warm base layer",
            "Form pleats at the back",
            "Secure with traditional knots",
            "Add decorative elements"
        ],
        "image_url": "https://example.com/kashmiri-pagri.jpg"
    },
    {
        "name": "Bengali Pagri",
        "region": "West Bengal",
        "description": "Traditional turban style from Bengal, worn during cultural events.",
        "historical_significance": "Part of Bengal's cultural and religious traditions.",
        "cultural_value": "Represents the rich cultural heritage of Bengal.",
        "tying_instructions": [
            "Use cotton or silk cloth",
            "Create a structured base",
            "Form elegant pleats",
            "Secure with traditional knots",
            "Add decorative elements"
        ],
        "image_url": "https://example.com/bengali-pagri.jpg"
    },
    {
        "name": "Tamil Nadu Pagri",
        "region": "Tamil Nadu",
        "description": "Traditional headgear from Tamil Nadu, worn during temple ceremonies.",
        "historical_significance": "Associated with temple traditions and cultural events.",
        "cultural_value": "Symbolizes the spiritual heritage of Tamil Nadu.",
        "tying_instructions": [
            "Use white cotton cloth",
            "Create a simple base",
            "Form pleats at the back",
            "Secure with traditional knots",
            "Add temple flower decorations"
        ],
        "image_url": "https://example.com/tamil-nadu-pagri.jpg"
    },
    {
        "name": "Maharashtrian Pagri",
        "region": "Maharashtra",
        "description": "Traditional turban style from Maharashtra, known for its distinctive look.",
        "historical_significance": "Worn during cultural events and ceremonies.",
        "cultural_value": "Represents the cultural heritage of Maharashtra.",
        "tying_instructions": [
            "Use cotton or silk cloth",
            "Create a structured base",
            "Form decorative pleats",
            "Secure with traditional knots",
            "Add decorative elements"
        ],
        "image_url": "https://example.com/maharashtrian-pagri.jpg"
    },
    {
        "name": "Punjabi Pagri",
        "region": "Punjab",
        "description": "Traditional turban style from Punjab, known for its size and elegance.",
        "historical_significance": "Symbol of Punjabi culture and pride.",
        "cultural_value": "Represents the rich cultural heritage of Punjab.",
        "tying_instructions": [
            "Use long cotton cloth",
            "Create a structured base",
            "Form multiple pleats",
            "Secure with traditional knots",
            "Add decorative elements"
        ],
        "image_url": "https://example.com/punjabi-pagri.jpg"
    },
    {
        "name": "Himachali Pagri",
        "region": "Himachal Pradesh",
        "description": "Traditional headgear from Himachal Pradesh, known for its warmth.",
        "historical_significance": "Worn by the people of Himachal Pradesh for centuries.",
        "cultural_value": "Symbolizes the cultural heritage of Himachal Pradesh.",
        "tying_instructions": [
            "Use woolen cloth",
            "Create a warm base layer",
            "Form pleats at the back",
            "Secure with traditional knots",
            "Add decorative elements"
        ],
        "image_url": "https://example.com/himachali-pagri.jpg"
    },
    {
        "name": "Uttarakhand Pagri",
        "region": "Uttarakhand",
        "description": "Traditional turban style from Uttarakhand, worn during cultural events.",
        "historical_significance": "Part of Uttarakhand's cultural traditions.",
        "cultural_value": "Represents the rich cultural heritage of Uttarakhand.",
        "tying_instructions": [
            "Use cotton or woolen cloth",
            "Create a structured base",
            "Form pleats at the back",
            "Secure with traditional knots",
            "Add decorative elements"
        ],
        "image_url": "https://example.com/uttarakhand-pagri.jpg"
    },
    {
        "name": "Bihari Pagri",
        "region": "Bihar",
        "description": "Traditional headgear from Bihar, known for its simplicity.",
        "historical_significance": "Worn during cultural events and ceremonies.",
        "cultural_value": "Symbolizes the cultural heritage of Bihar.",
        "tying_instructions": [
            "Use cotton cloth",
            "Create a simple base",
            "Form pleats at the back",
            "Secure with traditional knots",
            "Add decorative elements"
        ],
        "image_url": "https://example.com/bihari-pagri.jpg"
    },
    {
        "name": "Jharkhand Pagri",
        "region": "Jharkhand",
        "description": "Traditional turban style from Jharkhand, worn during tribal ceremonies.",
        "historical_significance": "Part of tribal traditions and cultural events.",
        "cultural_value": "Represents the rich tribal heritage of Jharkhand.",
        "tying_instructions": [
            "Use cotton cloth",
            "Create a structured base",
            "Form pleats at the back",
            "Secure with traditional knots",
            "Add tribal decorations"
        ],
        "image_url": "https://example.com/jharkhand-pagri.jpg"
    },
    {
        "name": "Chhattisgarh Pagri",
        "region": "Chhattisgarh",
        "description": "Traditional headgear from Chhattisgarh, known for its tribal style.",
        "historical_significance": "Associated with tribal traditions and ceremonies.",
        "cultural_value": "Symbolizes the tribal heritage of Chhattisgarh.",
        "tying_instructions": [
            "Use cotton cloth",
            "Create a simple base",
            "Form pleats at the back",
            "Secure with traditional knots",
            "Add tribal decorations"
        ],
        "image_url": "https://example.com/chhattisgarh-pagri.jpg"
    },
    {
        "name": "Odisha Pagri",
        "region": "Odisha",
        "description": "Traditional turban style from Odisha, worn during cultural events.",
        "historical_significance": "Part of Odisha's cultural and religious traditions.",
        "cultural_value": "Represents the rich cultural heritage of Odisha.",
        "tying_instructions": [
            "Use cotton or silk cloth",
            "Create a structured base",
            "Form pleats at the back",
            "Secure with traditional knots",
            "Add decorative elements"
        ],
        "image_url": "https://example.com/odisha-pagri.jpg"
    },
    {
        "name": "Andhra Pradesh Pagri",
        "region": "Andhra Pradesh",
        "description": "Traditional turban style from Andhra Pradesh, worn during cultural events.",
        "historical_significance": "Part of Andhra Pradesh's cultural and religious traditions.",
        "cultural_value": "Represents the rich cultural heritage of Andhra Pradesh.",
        "tying_instructions": [
            "Use cotton or silk cloth",
            "Create a structured base",
            "Form pleats at the back",
            "Secure with traditional knots",
            "Add decorative elements"
        ],
        "image_url": "https://example.com/andhra-pradesh-pagri.jpg"
    },
    {
        "name": "Telangana Pagri",
        "region": "Telangana",
        "description": "Traditional turban style from Telangana, worn during cultural events.",
        "historical_significance": "Part of Telangana's cultural and religious traditions.",
        "cultural_value": "Represents the rich cultural heritage of Telangana.",
        "tying_instructions": [
            "Use cotton or silk cloth",
            "Create a structured base",
            "Form pleats at the back",
            "Secure with traditional knots",
            "Add decorative elements"
        ],
        "image_url": "https://example.com/telangana-pagri.jpg"
    },
    {
        "name": "Karnataka Pagri",
        "region": "Karnataka",
        "description": "Traditional turban style from Karnataka, worn during cultural events.",
        "historical_significance": "Part of Karnataka's cultural and religious traditions.",
        "cultural_value": "Represents the rich cultural heritage of Karnataka.",
        "tying_instructions": [
            "Use cotton or silk cloth",
            "Create a structured base",
            "Form pleats at the back",
            "Secure with traditional knots",
            "Add decorative elements"
        ],
        "image_url": "https://example.com/karnataka-pagri.jpg"
    },
    {
        "name": "Tamil Nadu Pagri",
        "region": "Tamil Nadu",
        "description": "Traditional turban style from Tamil Nadu, worn during cultural events.",
        "historical_significance": "Part of Tamil Nadu's cultural and religious traditions.",
        "cultural_value": "Represents the rich cultural heritage of Tamil Nadu.",
        "tying_instructions": [
            "Use cotton or silk cloth",
            "Create a structured base",
            "Form pleats at the back",
            "Secure with traditional knots",
            "Add decorative elements"
        ],
        "image_url": "https://example.com/tamil-nadu-pagri.jpg"
    },
    {
        "name": "Goa Pagri",
        "region": "Goa",
        "description": "Traditional turban style from Goa, worn during cultural events.",
        "historical_significance": "Part of Goa's cultural and religious traditions.",
        "cultural_value": "Represents the rich cultural heritage of Goa.",
        "tying_instructions": [
            "Use cotton or silk cloth",
            "Create a structured base",
            "Form pleats at the back",
            "Secure with traditional knots",
            "Add decorative elements"
        ],
        "image_url": "https://example.com/goa-pagri.jpg"
    },
    {
        "name": "Manipur Pagri",
        "region": "Manipur",
        "description": "Traditional turban style from Manipur, worn during cultural events.",
        "historical_significance": "Part of Manipur's cultural and religious traditions.",
        "cultural_value": "Represents the rich cultural heritage of Manipur.",
        "tying_instructions": [
            "Use cotton or silk cloth",
            "Create a structured base",
            "Form pleats at the back",
            "Secure with traditional knots",
            "Add decorative elements"
        ],
        "image_url": "https://example.com/manipur-pagri.jpg"
    },
    {
        "name": "Meghalaya Pagri",
        "region": "Meghalaya",
        "description": "Traditional turban style from Meghalaya, worn during cultural events.",
        "historical_significance": "Part of Meghalaya's cultural and religious traditions.",
        "cultural_value": "Represents the rich cultural heritage of Meghalaya.",
        "tying_instructions": [
            "Use cotton or silk cloth",
            "Create a structured base",
            "Form pleats at the back",
            "Secure with traditional knots",
            "Add decorative elements"
        ],
        "image_url": "https://example.com/meghalaya-pagri.jpg"
    },
    {
        "name": "Mizoram Pagri",
        "region": "Mizoram",
        "description": "Traditional turban style from Mizoram, worn during cultural events.",
        "historical_significance": "Part of Mizoram's cultural and religious traditions.",
        "cultural_value": "Represents the rich cultural heritage of Mizoram.",
        "tying_instructions": [
            "Use cotton or silk cloth",
            "Create a structured base",
            "Form pleats at the back",
            "Secure with traditional knots",
            "Add decorative elements"
        ],
        "image_url": "https://example.com/mizoram-pagri.jpg"
    },
    {
        "name": "Nagaland Pagri",
        "region": "Nagaland",
        "description": "Traditional turban style from Nagaland, worn during cultural events.",
        "historical_significance": "Part of Nagaland's cultural and religious traditions.",
        "cultural_value": "Represents the rich cultural heritage of Nagaland.",
        "tying_instructions": [
            "Use cotton or silk cloth",
            "Create a structured base",
            "Form pleats at the back",
            "Secure with traditional knots",
            "Add decorative elements"
        ],
        "image_url": "https://example.com/nagaland-pagri.jpg"
    },
    {
        "name": "Sikkim Pagri",
        "region": "Sikkim",
        "description": "Traditional turban style from Sikkim, worn during cultural events.",
        "historical_significance": "Part of Sikkim's cultural and religious traditions.",
        "cultural_value": "Represents the rich cultural heritage of Sikkim.",
        "tying_instructions": [
            "Use cotton or silk cloth",
            "Create a structured base",
            "Form pleats at the back",
            "Secure with traditional knots",
            "Add decorative elements"
        ],
        "image_url": "https://example.com/sikkim-pagri.jpg"
    },
    {
        "name": "Tripura Pagri",
        "region": "Tripura",
        "description": "Traditional turban style from Tripura, worn during cultural events.",
        "historical_significance": "Part of Tripura's cultural and religious traditions.",
        "cultural_value": "Represents the rich cultural heritage of Tripura.",
        "tying_instructions": [
            "Use cotton or silk cloth",
            "Create a structured base",
            "Form pleats at the back",
            "Secure with traditional knots",
            "Add decorative elements"
        ],
        "image_url": "https://example.com/tripura-pagri.jpg"
    },
    {
        "name": "Arunachal Pradesh Pagri",
        "region": "Arunachal Pradesh",
        "description": "Traditional turban style from Arunachal Pradesh, worn during cultural events.",
        "historical_significance": "Part of Arunachal Pradesh's cultural and religious traditions.",
        "cultural_value": "Represents the rich cultural heritage of Arunachal Pradesh.",
        "tying_instructions": [
            "Use cotton or silk cloth",
            "Create a structured base",
            "Form pleats at the back",
            "Secure with traditional knots",
            "Add decorative elements"
        ],
        "image_url": "https://example.com/arunachal-pradesh-pagri.jpg"
    },
    {
        "name": "Assam Pagri",
        "region": "Assam",
        "description": "Traditional turban style from Assam, worn during cultural events.",
        "historical_significance": "Part of Assam's cultural and religious traditions.",
        "cultural_value": "Represents the rich cultural heritage of Assam.",
        "tying_instructions": [
            "Use cotton or silk cloth",
            "Create a structured base",
            "Form pleats at the back",
            "Secure with traditional knots",
            "Add decorative elements"
        ],
        "image_url": "https://example.com/assam-pagri.jpg"
    }
]

async def seed_database():
    try:
        client = AsyncIOMotorClient(MONGODB_URL)
        db = client.indian_pagris
        
        # Clear existing data
        await db.pagris.delete_many({})
        
        # Insert new data
        result = await db.pagris.insert_many(pagris)
        print(f"Successfully seeded {len(result.inserted_ids)} pagris")
        
        # Verify the count
        count = await db.pagris.count_documents({})
        print(f"Total pagris in database: {count}")
        
    except Exception as e:
        print(f"Error seeding database: {e}")
    finally:
        client.close()

if __name__ == "__main__":
    asyncio.run(seed_database()) 