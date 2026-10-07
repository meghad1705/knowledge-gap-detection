def identify_gaps(scores: dict[str, float], threshold: float = 70.0) -> list[str]:
    return [topic for topic, score in scores.items() if score < threshold]
