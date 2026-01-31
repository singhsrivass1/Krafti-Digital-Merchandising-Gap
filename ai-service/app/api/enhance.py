from fastapi import APIRouter, UploadFile, File
from PIL import Image
import io

router = APIRouter()


@router.post("/enhance")
async def enhance(file: UploadFile = File(...)):
    from app.services.background import remove_background
    from app.services.enhancement import enhance_image
    from app.services.description import generate_product_text
    from app.services.price_intelligence import estimate_price
    from app.services.pixelcut_bg import try_pixelcut_background
    from app.utils.image import pil_to_base64

    image_bytes = await file.read()

    image = Image.open(io.BytesIO(image_bytes)).convert("RGBA")

    image_no_bg = remove_background(image_bytes)

    enhanced_image = enhance_image(image_no_bg)

    text = generate_product_text(enhanced_image)
    raw_caption = text["caption"]

    pixelcut_image = try_pixelcut_background(
        enhanced_image,
        raw_caption
    )

    if pixelcut_image:
        final_image = pixelcut_image
    else:
        white_bg = Image.new("RGBA", enhanced_image.size, (255, 255, 255, 255))
        white_bg.paste(enhanced_image, (0, 0), enhanced_image)
        final_image = white_bg

    price = estimate_price(
        title=text["title"],
        description=text["description"],
        visual_caption=text["caption"],
    )

    image_base64 = pil_to_base64(final_image)

    return {
        "image": image_base64,
        "title": text["title"],
        "description": text["description"],
        "price": price,
    }
