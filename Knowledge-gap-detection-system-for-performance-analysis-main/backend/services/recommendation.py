def recommend_next_topic(gaps: list[str]) -> str | None:
    return gaps[0] if gaps else None
