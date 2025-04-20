
from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.extractors.factory import get_extractor

router = APIRouter()

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        content = await file.read()
        extractor = get_extractor(file)
        text = extractor.extract_text(content)
        return {
                "filename": file.filename,
                "text": text
                }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        await file.close()