from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import numpy as np

model_name = "mental/mental-bert-base-uncased" 
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name)

def analyze_text(text):
    """
    Analyze text for emotional states and mental health indicators
    """
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True, max_length=512)
    
    with torch.no_grad():
        outputs = model(**inputs)
        predictions = torch.nn.functional.softmax(outputs.logits, dim=-1)
    
    # Get the core depression score
    depression_score = predictions[0][1].item()
    
    # Consistent threshold mapping
    if depression_score > 0.95:
        mood = "Signs of severe depression detected"
        severity = "high"
    elif depression_score > 0.75:
        mood = "Signs of moderate depression detected"
        severity = "moderate"
    elif depression_score > 0.5:
        mood = "Signs of mild depression detected"
        severity = "mild"
    else:
        mood = "No significant signs of depression detected"
        severity = "low"
    
    # Generate more meaningful emotion analysis based on depression score and text properties
    # This is a simplified approach - ideally you'd have specific models for each emotion
    word_count = len(text.split())
    sentence_count = len([s for s in text.split('.') if s])
    avg_sentence_length = word_count / max(1, sentence_count)
    
    # Use linguistic features to inform emotional state estimations
    negative_words = sum(1 for word in ['sad', 'unhappy', 'depressed', 'anxious', 'worried', 'afraid'] 
                         if word in text.lower())
    positive_words = sum(1 for word in ['happy', 'joy', 'excited', 'glad', 'pleasure', 'content'] 
                         if word in text.lower())
    
    # Deterministic emotion analysis (no randomness)
    emotions = {
        "sadness": depression_score * 100,
        "anxiety": min(100, max(0, depression_score * 90 + (avg_sentence_length > 15) * 10)),
        "anger": min(100, max(0, depression_score * 50 + negative_words * 5)),
        "fear": min(100, max(0, depression_score * 60 + negative_words * 3)),
        "joy": min(100, max(0, (1 - depression_score) * 80 + positive_words * 5))
    }
    
    return {
        "depression_score": depression_score,
        "mood_assessment": mood,
        "severity": severity,
        "emotions": emotions,
        "text_stats": {
            "word_count": word_count,
            "sentence_count": sentence_count,
            "avg_sentence_length": avg_sentence_length
        }
    }