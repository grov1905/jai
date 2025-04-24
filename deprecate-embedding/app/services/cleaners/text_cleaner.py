import re

def clean_text(text: str) -> str:
    text = text.replace('\r\n', '\n').replace('\r', '\n')  # normaliza saltos de línea
    text = re.sub(r'[ \t]+', ' ', text)                   # reemplaza múltiples espacios por uno
    text = re.sub(r'\n{2,}', '\n\n', text)                # reduce saltos de línea excesivos
    text = text.strip()
    return text
