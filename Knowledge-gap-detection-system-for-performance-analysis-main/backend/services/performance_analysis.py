def mastery_percentage(correct: int, total: int) -> float:
    if total <= 0:
        return 0.0
    return round(correct / total * 100, 1)
