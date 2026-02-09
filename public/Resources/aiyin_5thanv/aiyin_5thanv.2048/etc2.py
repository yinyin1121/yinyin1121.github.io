import sys
import texture2ddecoder
from PIL import Image

if __name__ == "__main__":
    if len(sys.argv) != 5:
        print("Usage: python etc2.py input output width height")
        sys.exit(1)

    input_file = sys.argv[1]
    output_file = sys.argv[2]
    width = int(sys.argv[3])
    height = int(sys.argv[4])
    
    data = open(input_file, "rb").read()
    
    decoded_data= texture2ddecoder.decode_etc2a8(data, width, height)

    dec_img = Image.frombytes("RGBA", (width, height), decoded_data, 'raw', ("BGRA"))
    dec_img.save(output_file)
    print("Saved:", output_file)
