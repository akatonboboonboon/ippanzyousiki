import { useState } from "react";
import type { Question } from "./data/types";

function ImageFigure({
  image,
  compact,
}: {
  image: NonNullable<Question["image"]>;
  compact: boolean;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <figure className={`question-visual ${compact ? "compact" : ""}`}>
      {failed ? (
        <p className="image-fallback" role="status">
          画像を読み込めませんでした。図の内容：{image.alt}
        </p>
      ) : (
        <img
          src={`${import.meta.env.BASE_URL}${image.src}`}
          alt={image.alt}
          width="480"
          height="280"
          loading={compact ? "lazy" : "eager"}
          onError={() => setFailed(true)}
        />
      )}
      {image.caption && <figcaption>{image.caption}</figcaption>}
      {!failed && (
        <details className="image-description">
          <summary>画像の説明</summary>
          <p>{image.alt}</p>
        </details>
      )}
    </figure>
  );
}

export default function QuestionImage({
  question,
  compact = false,
}: {
  question: Question;
  compact?: boolean;
}) {
  return question.image ? (
    <ImageFigure
      key={question.image.src}
      image={question.image}
      compact={compact}
    />
  ) : null;
}
