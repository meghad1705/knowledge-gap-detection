from dataclasses import dataclass

@dataclass(frozen=True)
class LearningContent:
    id: str
    subject: str
    title: str
    content_type: str
    duration_minutes: int
    level: str
    description: str
    topic: str

CONTENT_CATALOG = (
    LearningContent("physics-newton", "Physics", "Newton's laws of motion", "video", 12, "Core", "See how force, mass, and acceleration work together.", "Mechanics"),
    LearningContent("math-quadratics", "Mathematics", "Reading a quadratic graph", "lesson", 15, "Practice", "Connect roots, vertices, and the shape of a parabola.", "Algebra"),
    LearningContent("cs-arrays", "Computer Science", "Arrays and time complexity", "video", 18, "Core", "Build intuition for the data structures behind fast programs.", "Data Structures"),
    LearningContent("english-evidence", "English", "Using evidence in writing", "lesson", 10, "Practice", "Turn observations into clear, persuasive analysis.", "Writing"),
    LearningContent("biology-cells", "Biology", "Inside the living cell", "video", 14, "Core", "Explore organelles and the systems that keep cells alive.", "Cell Biology"),
    LearningContent("chemistry-reactions", "Chemistry", "Balancing chemical reactions", "lesson", 16, "Practice", "Use conservation of mass to balance equations with confidence.", "Chemical Reactions"),
    LearningContent("history-revolutions", "History", "How revolutions begin", "video", 13, "Core", "Trace the causes and consequences of major revolutions.", "Modern History"),
    LearningContent("geography-climate", "Geography", "Climate patterns and people", "lesson", 11, "Core", "Connect atmospheric systems to the places people live.", "Physical Geography"),
    LearningContent("economics-markets", "Economics", "Supply, demand, and markets", "video", 17, "Core", "Understand how incentives shape prices and decisions.", "Microeconomics"),
    LearningContent("psychology-memory", "Psychology", "The science of memory", "lesson", 12, "Practice", "Learn how attention and retrieval shape what you remember.", "Cognition"),
    LearningContent("sociology-culture", "Sociology", "Culture and social identity", "video", 15, "Core", "Examine how groups shape identity, norms, and belonging.", "Socialization"),
    LearningContent("philosophy-ethics", "Philosophy", "Reasoning through ethical choices", "lesson", 14, "Practice", "Compare ethical frameworks for making difficult decisions.", "Ethics"),
    LearningContent("art-composition", "Art", "Principles of visual composition", "video", 10, "Core", "Use balance, contrast, and rhythm to guide the eye.", "Design Principles"),
    LearningContent("music-rhythm", "Music", "Reading rhythm and meter", "lesson", 9, "Core", "Build fluency with beats, rests, and musical time.", "Music Theory"),
    LearningContent("statistics-distributions", "Statistics", "Reading data distributions", "video", 16, "Practice", "Interpret shape, spread, and center in real datasets.", "Descriptive Statistics"),
    LearningContent("programming-python", "Programming", "Writing your first Python function", "lesson", 18, "Core", "Break a problem into reusable, testable instructions.", "Python"),
    LearningContent("engineering-structures", "Engineering", "Why structures stand", "video", 15, "Core", "Discover how forces travel through bridges and buildings.", "Statics"),
    LearningContent("astronomy-stars", "Astronomy", "The life cycle of stars", "lesson", 13, "Core", "Follow stars from formation through their final stages.", "Stellar Evolution"),
    LearningContent("environmental-sustainability", "Environmental Science", "Systems of sustainability", "video", 17, "Practice", "Evaluate choices that protect resources for the future.", "Sustainability"),
    LearningContent("health-nutrition", "Health", "Building balanced nutrition", "lesson", 10, "Core", "Understand the roles of nutrients in everyday health.", "Nutrition"),
    LearningContent("civics-government", "Civics", "How local government works", "video", 12, "Core", "See how communities make decisions and deliver services.", "Government"),
    LearningContent("media-literacy", "Media Literacy", "Checking claims online", "lesson", 11, "Practice", "Separate evidence, opinion, and misleading information.", "Critical Thinking"),
)


def list_content(subject: str | None = None) -> list[LearningContent]:
    if not subject:
        return list(CONTENT_CATALOG)
    return [item for item in CONTENT_CATALOG if item.subject.casefold() == subject.casefold()]


def get_content(content_id: str) -> LearningContent | None:
    return next((item for item in CONTENT_CATALOG if item.id == content_id), None)
