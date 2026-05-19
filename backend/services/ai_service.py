import json

from flask import current_app
from openai import OpenAI


def generate_lesson_recommendations(
    title,
    discipline,
    summary,
):
    api_key = current_app.config.get("GROQ_API_KEY")

    client = OpenAI(api_key=api_key, base_url="https://api.groq.com/openai/v1")

    prompt = f"""
    Você é um assistente pedagógico.

    Com base nos dados abaixo:

    Título da aula: {title}
    Disciplina: {discipline}
    Resumo: {summary}

    Gere:
    - conteúdos complementares
    - tópicos relacionados
    - 3 tags

    Responda APENAS em JSON no formato:

    {{
      "recommended_contents": [],
      "related_topics": [],
      "tags": []
    }}
    """

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7,
    )

    content = response.choices[0].message.content

    content = content.replace("```json", "").replace("```", "").strip()

    return json.loads(content)
