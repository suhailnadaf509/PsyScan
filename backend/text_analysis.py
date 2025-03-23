from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

model_name = "mental/mental-bert-base-uncased" 
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name)

def analyze_text(text):
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True, max_length=512)
    
    with torch.no_grad():
        outputs = model(**inputs)
        predictions = torch.nn.functional.softmax(outputs.logits, dim=-1)
    
    depression_score = predictions[0][1].item() 
    
    if depression_score > 0.95:
        mood = "Signs of severe depression detected"
    elif depression_score > 0.75:
        mood = "Signs of moderate depression detected"
    elif depression_score > 0.5:
        mood = "Signs of mild depression detected"
    else:
        mood = "No significant signs of depression detected"
        
    return {
        "depression_score": depression_score,
        "mood_assessment": mood
    }