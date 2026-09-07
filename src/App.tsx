import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ArrowLeft,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock3,
  Compass,
  Flower2,
  Globe2,
  GraduationCap,
  History,
  Landmark,
  Leaf,
  Lightbulb,
  Monitor,
  Play,
  RotateCcw,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Trash2,
  Trophy,
  X,
  XCircle,
  ChartNoAxesCombined,
  type LucideIcon,
} from "lucide-react";
import {
  CATEGORIES,
  categoryFor,
  LEGACY_CATEGORIES,
  DIFFICULTIES,
  type CategoryId,
  type Question,
} from "./data/types";
import { questions, questionMap, activeQuestionIds } from "./data/questions";
import {
  categoryScores,
  createSession,
  createDiagnosticConfig,
  DIAGNOSTIC_COUNT,
  DIAGNOSTIC_VERSION,
  diagnosticName,
  isStandardDiagnostic,
  finishSession,
  getGrade,
  readSaved,
  STORAGE_KEY,
  type QuizConfig,
  type Result,
  type Session,
} from "./lib/quiz";
import Radar from "./Radar";
import QuestionImage from "./QuestionImage";
import { recordExposure, recordAnswer } from "./lib/learning";

const activeQuestionMap = new Map(questions.map((q) => [q.id, q]));

const icons: Record<CategoryId, LucideIcon> = {
  household: Lightbulb,
  health: Leaf,
  money: ChartNoAxesCombined,
  consumer: ShieldCheck,
  work: BookOpen,
  manners: Flower2,
  public: Compass,
  safety: ShieldCheck,
  digital: Monitor,
  civic: Landmark,
  world: Globe2,
  language: BookOpen,
  geography: Globe2,
  history: Landmark,
  society: ChartNoAxesCombined,
  science: Leaf,
  life: Lightbulb,
  culture: Flower2,
  information: Monitor,
};
const initialConfig: QuizConfig = {
  difficulty: "mix",
  categories: CATEGORIES.map((c) => c.id),
  count: 24,
  mode: "quiz",
};
const dateFormat = new Intl.DateTimeFormat("ja-JP", {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});
const difficultyName = (id: string) =>
  DIFFICULTIES.find((d) => d.id === id)?.name ?? id;
const usesLegacyCategories = (record: Pick<Result, "items">) =>
  record.items.some((item) => !item.questionId.startsWith("v2-"));
function resultSummary(result: Result) {
  const scores = categoryScores(result, questionMap);
  const correct = scores.reduce((n, s) => n + s.correct, 0);
  return {
    scores,
    correct,
    percent: Math.round((correct / result.items.length) * 100),
  };
}
function CategoryIcon({ id, size = 20 }: { id: CategoryId; size?: number }) {
  const Icon = icons[id];
  return <Icon size={size} strokeWidth={1.7} />;
}
function Source({ question }: { question: Question }) {
  return question.source ? (
    <a
      className="source-link"
      href={question.source.url}
      target="_blank"
      rel="noreferrer"
    >
      出典：{question.source.label}
      <ArrowUpRight size={12} />
    </a>
  ) : null;
}

export default function App() {
  const [saved] = useState(() => readSaved(questionMap));
  const [history, setHistory] = useState<Result[]>(saved.history);
  const [learning, setLearning] = useState(saved.learning);
  const retiredSession = Boolean(
    saved.session && usesLegacyCategories(saved.session),
  );
  const [session, setSession] = useState<Session | null>(
    retiredSession ? null : saved.session,
  );
  const [showRevisionNotice, setShowRevisionNotice] = useState(retiredSession);
  const [page, setPage] = useState<
    "home" | "quiz" | "result" | "history" | "library"
  >("home");
  const [config, setConfig] = useState<QuizConfig>(initialConfig);
  const [challengeMode, setChallengeMode] = useState<"diagnostic" | "quiz">(
    "diagnostic",
  );
  const [startError, setStartError] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [storageError, setStorageError] = useState(false);
  const [replacePending, setReplacePending] = useState<(() => void) | null>(
    null,
  );
  const [clearPending, setClearPending] = useState(false);
  const configRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [librarySearch, setLibrarySearch] = useState("");
  const [libraryCategory, setLibraryCategory] = useState("all");
  const [libraryDifficulty, setLibraryDifficulty] = useState("all");
  const [libraryTopic, setLibraryTopic] = useState("all");
  const [libraryFormat, setLibraryFormat] = useState("all");
  const [libraryPage, setLibraryPage] = useState(0);
  const [reviewFilter, setReviewFilter] = useState<"wrong" | "all">("wrong");

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ version: 1, history, session, learning }),
      );
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }, [history, session, learning]);
  useEffect(() => {
    if (page !== "quiz" || !session) return;
    const item = session.items[session.index];
    if (activeQuestionIds.has(item.questionId)) {
      setLearning((previous) =>
        recordExposure(previous, item, session.id, Date.now()),
      );
    }
  }, [page, session?.id, session?.index]);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    titleRef.current?.focus({ preventScroll: true });
  }, [page]);
  useEffect(() => {
    setSelected(null);
    if (page === "quiz") titleRef.current?.focus({ preventScroll: true });
  }, [session?.index, page]);
  useEffect(() => {
    setLibraryPage(0);
  }, [
    librarySearch,
    libraryCategory,
    libraryDifficulty,
    libraryTopic,
    libraryFormat,
  ]);

  const available = questions.filter(
    (q) =>
      config.categories.includes(q.category) &&
      (config.difficulty === "mix" || q.difficulty === config.difficulty),
  );
  const examCount = Math.min(config.count, available.length);
  const currentHistory = useMemo(
    () =>
      history.filter((record) =>
        record.items.every((item) => activeQuestionIds.has(item.questionId)),
      ),
    [history],
  );
  const studied = Object.keys(learning).length;
  const diagnosticHistory = history.filter(isStandardDiagnostic);
  const latestDiagnostic = diagnosticHistory.find(
    (r) => r.config.diagnosticVersion === DIAGNOSTIC_VERSION,
  );
  const wrongIds = useMemo(() => {
    return new Set(
      Object.entries(learning)
        .filter(([, progress]) => progress.correct === false)
        .map(([id]) => id),
    );
  }, [learning]);
  const historyCorrect = currentHistory.reduce(
    (sum, r) => sum + resultSummary(r).correct,
    0,
  );
  const historyTotal = currentHistory.reduce(
    (sum, r) => sum + r.items.length,
    0,
  );
  const last = history[0];
  const libraryQuestions = useMemo(
    () =>
      questions.filter(
        (q) =>
          (libraryCategory === "all" || q.category === libraryCategory) &&
          (libraryDifficulty === "all" || q.difficulty === libraryDifficulty) &&
          (libraryTopic === "all" || q.topic === libraryTopic) &&
          (libraryFormat === "all" ||
            (libraryFormat === "image" ? Boolean(q.image) : !q.image)) &&
          `${q.topic ?? ""} ${q.prompt} ${q.choices.join(" ")} ${q.explanation}`
            .normalize("NFKC")
            .toLowerCase()
            .includes(librarySearch.trim().normalize("NFKC").toLowerCase()),
      ),
    [
      librarySearch,
      libraryCategory,
      libraryDifficulty,
      libraryTopic,
      libraryFormat,
    ],
  );

  function start(bank = questions, settings = config) {
    const begin = () => {
      try {
        const nextSession = createSession(bank, settings, learning);
        setSession(nextSession);
        setSelected(null);
        setStartError("");
        setPage("quiz");
      } catch (error) {
        setStartError(
          error instanceof Error
            ? error.message
            : "クイズを開始できませんでした。",
        );
      }
      setReplacePending(null);
    };
    if (session) setReplacePending(() => begin);
    else begin();
  }
  function startReview(ids: Set<string>) {
    const bank = questions.filter((q) => ids.has(q.id));
    if (bank.length)
      start(bank, {
        mode: "review",
        categories: [...new Set(bank.map((q) => q.category))],
        difficulty: "mix",
        count: bank.length,
      });
  }
  function answer() {
    if (
      !session ||
      selected === null ||
      session.answers[session.index] !== null
    )
      return;
    setLearning((previous) =>
      recordAnswer(
        previous,
        session.items[session.index],
        selected,
        activeQuestionMap,
        session.id,
        Date.now(),
      ),
    );
    setSession({
      ...session,
      answers: session.answers.map((a, i) =>
        i === session.index ? selected : a,
      ),
    });
  }
  function next() {
    if (!session || session.answers[session.index] === null) return;
    if (session.index === session.items.length - 1) {
      const completed = finishSession(session);
      setHistory((h) =>
        [completed, ...h.filter((r) => r.id !== completed.id)].slice(0, 50),
      );
      setResult(completed);
      setSession(null);
      setReviewFilter("wrong");
      setPage("result");
    } else {
      setSession({ ...session, index: session.index + 1 });
      setSelected(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }
  function viewResult(r: Result) {
    setResult(r);
    setReviewFilter("wrong");
    setPage("result");
  }
  function toggleCategory(id: CategoryId) {
    setConfig((c) => ({
      ...c,
      categories: c.categories.includes(id)
        ? c.categories.filter((v) => v !== id)
        : [...c.categories, id],
    }));
  }
  const stats = result ? resultSummary(result) : null;
  const resultHasRetiredQuestions = Boolean(
    result?.items.some((item) => !activeQuestionIds.has(item.questionId)),
  );
  const resultUsesLegacyCategories = Boolean(
    result && usesLegacyCategories(result),
  );
  const reviewableWrongIds = new Set(
    result?.items
      .filter(
        (item, index) =>
          activeQuestionIds.has(item.questionId) &&
          item.order[result.answers[index]] !==
            questionMap.get(item.questionId)!.answer,
      )
      .map((item) => item.questionId) ?? [],
  );
  const grade = stats ? getGrade(stats.percent) : null;
  const standardResult = result ? isStandardDiagnostic(result) : false;
  const previousDiagnostic =
    result && standardResult
      ? diagnosticHistory.find(
          (r) =>
            r.id !== result.id &&
            r.finishedAt <= result.finishedAt &&
            r.config.diagnosticVersion === result.config.diagnosticVersion,
        )
      : undefined;
  const currentItem = session?.items[session.index];
  const currentQuestion = currentItem
    ? questionMap.get(currentItem.questionId)!
    : null;
  const currentAnswer = session?.answers[session.index] ?? null;
  const answered = currentAnswer !== null;
  const inDiagnostic = session?.config.mode === "diagnostic";
  const showFeedback = answered && !inDiagnostic;
  const questionCategory = CATEGORIES.find(
    (c) => c.id === currentQuestion?.category,
  );
  const daily = questions[Math.floor(Date.now() / 86400000) % questions.length];

  return (
    <>
      <a className="skip-link" href="#main">
        本文へスキップ
      </a>
      <header className="site-header">
        <div className="header-inner">
          <button
            className="brand"
            onClick={() => setPage("home")}
            aria-label="常識のものさし ホーム"
          >
            <span className="brand-mark">
              <BookOpen size={23} strokeWidth={1.6} />
            </span>
            <span>
              常識のものさし<small>一般常識クイズ</small>
            </span>
          </button>
          <nav aria-label="メインナビゲーション">
            <button
              className={page === "home" || page === "quiz" ? "active" : ""}
              onClick={() => setPage("home")}
            >
              <Compass size={17} />
              <span>クイズに挑戦</span>
            </button>
            <button
              className={
                page === "history" || page === "result" ? "active" : ""
              }
              onClick={() => setPage("history")}
            >
              <ChartNoAxesCombined size={17} />
              <span>学習の記録</span>
              {history.length > 0 && <i className="nav-dot" />}
            </button>
            <button
              className={page === "library" ? "active" : ""}
              onClick={() => setPage("library")}
            >
              <BookOpen size={17} />
              <span>問題ライブラリ</span>
            </button>
          </nav>
          <span className="header-note">
            <span className="status-dot" />
            登録不要
          </span>
        </div>
      </header>
      {storageError && (
        <div role="alert" className="storage-warning">
          今回の回答や記録の変更を保存できていません。クイズは続けられますが、ページを閉じると保存できなかった内容は失われます。
        </div>
      )}
      <main id="main" className={`main-content page-${page}`}>
        {page === "home" && (
          <>
            {showRevisionNotice && (
              <div className="content-notice" role="status">
                <p>
                  問題集の更新により、古い形式のクイズは再開できなくなりました。新しいクイズを選んでください。完了済みの結果は残っています。
                </p>
                <button
                  className="icon-button"
                  aria-label="問題改訂のお知らせを閉じる"
                  onClick={() => setShowRevisionNotice(false)}
                >
                  <X size={16} />
                </button>
              </div>
            )}
            <section className="hero">
              <div className="hero-copy">
                <h1 ref={titleRef} tabIndex={-1}>
                  一般常識を
                  <br />
                  クイズで
                  <span className="hero-question">
                    チェック
                    <svg viewBox="0 0 80 13" aria-hidden="true">
                      <path d="M3 9Q35 0 76 5" />
                    </svg>
                  </span>
                </h1>
                <p>
                  生活の知識から、言葉やスポーツまで。
                  <br />
                  正解数とジャンル別の成績を確認できます。
                </p>
                <div className="hero-facts">
                  <span>
                    <BookOpen size={16} />
                    <b>{questions.length}</b>問を収録
                  </span>
                  <span>
                    <Globe2 size={16} />
                    <b>{CATEGORIES.length}</b>ジャンル
                  </span>
                  <span>
                    <ChartNoAxesCombined size={16} />
                    <b>3</b>段階の難易度
                  </span>
                </div>
                <button
                  className="text-link hero-link"
                  onClick={() =>
                    configRef.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    })
                  }
                >
                  クイズを選ぶ
                  <ArrowRight size={17} />
                </button>
              </div>
              <div className="hero-visual">
                <div className="floating-label label-top">
                  <Sparkles size={14} />
                  得意・苦手を確認
                </div>
                <div className="radar-preview">
                  <div className="preview-top">
                    <span>
                      <Target size={15} /> ジャンル別の成績
                    </span>
                    <small>サンプル</small>
                  </div>
                  <Radar
                    sample
                    scores={CATEGORIES.map((c, i) => ({
                      category: c.id,
                      correct: 0,
                      total: 0,
                      percent: [85, 68, 80, 52, 93, 75, 48, 75, 65, 82, 58, 70][
                        i
                      ],
                    }))}
                  />
                  <div className="preview-bottom">
                    <span className="legend-dot" />
                    {CATEGORIES.length}ジャンルの正答率を表示
                  </div>
                </div>
                <div className="floating-label label-bottom">
                  <span className="tiny-check">
                    <Check size={12} />
                  </span>
                  間違えた問題を復習
                </div>
                <span className="deco-star star-one">✳</span>
                <span className="deco-star star-two">✧</span>
              </div>
            </section>
            {session && (
              <div className="resume-banner">
                <div className="resume-icon">
                  <History size={21} />
                </div>
                <div>
                  <strong>途中のクイズがあります</strong>
                  <p>
                    {session.answers.filter((a) => a !== null).length} /{" "}
                    {session.items.length}問 回答済み ·{" "}
                    {inDiagnostic
                      ? diagnosticName(session.config.diagnosticVersion)
                      : difficultyName(session.config.difficulty)}
                  </p>
                  {((inDiagnostic &&
                    session.config.diagnosticVersion !== DIAGNOSTIC_VERSION) ||
                    session.items.some(
                      (item) => !activeQuestionIds.has(item.questionId),
                    )) && <p>開始時の問題・選択肢で再開します。</p>}
                </div>
                <button
                  className="button primary small"
                  onClick={() => setPage("quiz")}
                >
                  クイズを再開
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
            <div className="dashboard-grid">
              <section className="panel quiz-setup" ref={configRef}>
                <div className="section-top">
                  <div>
                    <h2>クイズを選ぶ</h2>
                  </div>
                  <span className="step-badge">
                    <Compass size={17} />
                  </span>
                </div>
                <details className="scope-guide">
                  <summary>
                    出題範囲と難易度について
                    <ChevronDown size={14} />
                  </summary>
                  <p>
                    家事、食、お金、買い物、仕事、慣習、交通、防災、ネット、社会の手続きに、ことばや身近な教養を加えた12ジャンル・
                    {questions.length}
                    問。画像で読む問題や、裁縫・靴・ペットなどの生活知識も収録しています。日本の暮らしを想定し、地域・宗教・製品による違いは問題文で示します。
                  </p>
                  <p>
                    出典と出題方針は、次のページで確認できます。
                    <a
                      href="https://github.com/akatonboboonboon/ippanzyousiki/blob/codex/build-quiz-app/docs/research/overview.md"
                      target="_blank"
                      rel="noreferrer"
                    >
                      調査と出題方針を読む
                    </a>
                  </p>
                </details>
                <div
                  className="challenge-modes"
                  role="group"
                  aria-label="クイズの種類"
                >
                  <button
                    className={challengeMode === "diagnostic" ? "selected" : ""}
                    aria-pressed={challengeMode === "diagnostic"}
                    onClick={() => {
                      setChallengeMode("diagnostic");
                      setStartError("");
                    }}
                  >
                    <Target size={20} />
                    <strong>標準診断</strong>
                    <small>12ジャンルから60問</small>
                  </button>
                  <button
                    className={challengeMode === "quiz" ? "selected" : ""}
                    aria-pressed={challengeMode === "quiz"}
                    onClick={() => {
                      setChallengeMode("quiz");
                      setStartError("");
                    }}
                  >
                    <BookOpen size={20} />
                    <strong>自由練習</strong>
                    <small>難易度・ジャンル・問数を選ぶ</small>
                  </button>
                </div>
                <details className="scope-guide">
                  <summary>
                    問題の選び方について
                    <ChevronDown size={14} />
                  </summary>
                  <p>
                    まだ出ていない問題を優先します。新しい問題が十分にある場合は、直近で間違えた問題を最大2割まで混ぜます。選んだ条件に合う未出題が足りない場合は、間違えた問題や最近出ていない問題も出題します。
                  </p>
                  <p>
                    出題済みの記録はこのブラウザーに保存し、履歴が50回を超えても保持します。途中でやめたクイズの未表示の問題は、未出題のままです。
                  </p>
                </details>
                {startError && (
                  <p className="start-error" role="alert">
                    {startError}
                  </p>
                )}
                {challengeMode === "diagnostic" ? (
                  <div className="diagnostic-setup">
                    <div className="diagnostic-heading">
                      <span className="pill">
                        {diagnosticName(DIAGNOSTIC_VERSION)}
                      </span>
                      <span>
                        <Clock3 size={14} />
                        約20分・途中で中断できます
                      </span>
                    </div>
                    <h3>各ジャンルから5問ずつ出題</h3>
                    <p>
                      各ジャンル5問、合計{DIAGNOSTIC_COUNT}
                      問。毎回、初級2問・中級2問・上級1問を出題します。各ジャンルに画像問題を1問含みます。
                    </p>
                    <div className="diagnostic-facts">
                      <span>
                        <b>60</b>問
                      </span>
                      <span>
                        <b>12</b>ジャンル
                      </span>
                      <span>
                        画像<b>12</b>問
                      </span>
                    </div>
                    <p className="diagnostic-note">
                      正解と解説は60問を終えてから表示します。同じ標準診断の前回の点数と比較できます。
                    </p>
                    {latestDiagnostic && (
                      <div className="last-diagnostic">
                        前回の{diagnosticName(DIAGNOSTIC_VERSION)}{" "}
                        <strong>
                          {resultSummary(latestDiagnostic).percent}点
                        </strong>
                        <small>
                          {dateFormat.format(latestDiagnostic.finishedAt)}
                        </small>
                      </div>
                    )}
                    <button
                      className="button primary start-button"
                      onClick={() => start(questions, createDiagnosticConfig())}
                    >
                      <Target size={18} />
                      標準診断をはじめる
                      <ArrowRight size={19} />
                    </button>
                    <small className="diagnostic-disclaimer">
                      学習用の目安です。出題内容やこれまでの学習によってスコアは変わります。
                    </small>
                  </div>
                ) : (
                  <>
                    <fieldset>
                      <legend>
                        <span className="number-label">01</span>難易度
                        <span className="label-note">1つ選んでください</span>
                      </legend>
                      <div className="difficulty-options">
                        {DIFFICULTIES.map((d, i) => (
                          <button
                            key={d.id}
                            aria-pressed={config.difficulty === d.id}
                            className={`difficulty-option ${config.difficulty === d.id ? "selected" : ""}`}
                            onClick={() =>
                              setConfig((c) => ({ ...c, difficulty: d.id }))
                            }
                          >
                            <span className="difficulty-title">
                              {i === 0 ? (
                                <Sparkles size={16} />
                              ) : (
                                <span className={`level-bars level-${i}`}>
                                  <i />
                                  <i />
                                  <i />
                                </span>
                              )}
                              {d.name}
                              {config.difficulty === d.id && (
                                <CheckCircle2
                                  className="difficulty-check"
                                  size={14}
                                />
                              )}
                            </span>
                            <small>{d.description}</small>
                          </button>
                        ))}
                      </div>
                    </fieldset>
                    <fieldset>
                      <legend>
                        <span className="number-label">02</span>ジャンル
                        <span className="label-note">複数選択できます</span>
                      </legend>
                      <div className="genre-options">
                        <button
                          className={`genre-chip all-genres ${config.categories.length === CATEGORIES.length ? "selected" : ""}`}
                          aria-pressed={
                            config.categories.length === CATEGORIES.length
                          }
                          onClick={() =>
                            setConfig((c) => ({
                              ...c,
                              categories: CATEGORIES.map((v) => v.id),
                            }))
                          }
                        >
                          <Globe2 size={15} />
                          すべてのジャンル
                          {config.categories.length === CATEGORIES.length && (
                            <Check size={14} />
                          )}
                        </button>
                        {CATEGORIES.map((c) => (
                          <button
                            key={c.id}
                            className={`genre-chip ${config.categories.includes(c.id) ? "selected" : ""}`}
                            aria-pressed={config.categories.includes(c.id)}
                            onClick={() => toggleCategory(c.id)}
                          >
                            <CategoryIcon id={c.id} size={15} />
                            {c.name}
                          </button>
                        ))}
                      </div>
                    </fieldset>
                    <fieldset>
                      <legend>
                        <span className="number-label">03</span>問題数
                        <span className="label-note">12問から選べます</span>
                      </legend>
                      <div className="count-row">
                        <div className="count-options">
                          {[12, 24, 48, 96, questions.length].map((count) => (
                            <button
                              key={count}
                              aria-pressed={config.count === count}
                              className={
                                config.count === count ? "selected" : ""
                              }
                              onClick={() =>
                                setConfig((c) => ({ ...c, count }))
                              }
                            >
                              {count === questions.length ? (
                                "全問"
                              ) : (
                                <>
                                  {count}
                                  <small>問</small>
                                </>
                              )}
                            </button>
                          ))}
                        </div>
                        <span className="time-estimate">
                          <Clock3 size={14} />約
                          {Math.max(1, Math.ceil(examCount * 0.3))}分
                        </span>
                      </div>
                    </fieldset>
                    <div className="start-area">
                      <p>
                        <ShieldCheck size={14} />
                        {!config.categories.length
                          ? "ジャンルを1つ以上選んでください"
                          : `${examCount}問 · 未出題を優先 · 間違えた問題も時々出題`}
                      </p>
                      <button
                        className="button primary start-button"
                        disabled={!examCount}
                        onClick={() => start()}
                      >
                        <Play size={17} fill="currentColor" />
                        クイズをはじめる
                        <ArrowRight size={19} />
                      </button>
                      <small>
                        {config.categories.length === CATEGORIES.length
                          ? "ジャンルや難易度を指定して練習できます。前回の点数と比べたい場合は、標準診断を選んでください。"
                          : "選んだジャンルから出題します。出題しないジャンルの成績は「未測定」と表示します。"}
                        {available.length < config.count &&
                          available.length > 0 &&
                          ` 条件に合う全${available.length}問が対象です。`}
                      </small>
                    </div>
                  </>
                )}
              </section>
              <aside className="home-sidebar">
                <section className="panel journey-card">
                  <div className="mini-heading">
                    <span>
                      <ChartNoAxesCombined size={17} />
                      これまでの記録
                    </span>
                    <span className="pill light">現行の問題集</span>
                  </div>
                  <div className="journey-stat">
                    <strong>
                      {studied}
                      <small> / {questions.length} 問</small>
                    </strong>
                    <span>出題済みの問題</span>
                  </div>
                  <div className="progress-track">
                    <span
                      style={{
                        width: `${(studied / questions.length) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="journey-numbers">
                    <div>
                      <b>
                        {currentHistory.length}
                        <small>回</small>
                      </b>
                      <span>完了した回数</span>
                    </div>
                    <div>
                      <b>
                        {historyTotal
                          ? Math.round((historyCorrect / historyTotal) * 100)
                          : "—"}
                        <small>{historyTotal ? "%" : ""}</small>
                      </b>
                      <span>累計正答率</span>
                    </div>
                  </div>
                  <button
                    className="text-link"
                    onClick={() => setPage("history")}
                  >
                    学習の記録を見る
                    <ArrowUpRight size={16} />
                  </button>
                </section>
                <section className="daily-card">
                  <div className="mini-heading">
                    <span>
                      <Lightbulb size={17} />
                      今日の1問
                    </span>
                    <span className="daily-spark">✧</span>
                  </div>
                  <p className="daily-question">{daily.prompt}</p>
                  <QuestionImage question={daily} compact />
                  <details>
                    <summary>
                      正解と解説を見る
                      <ChevronDown size={15} />
                    </summary>
                    <div className="daily-answer">
                      <strong>{daily.choices[daily.answer]}</strong>
                      <p>{daily.explanation}</p>
                      <Source question={daily} />
                    </div>
                  </details>
                </section>
                <div className="sidebar-note">
                  <BookOpen size={23} strokeWidth={1.3} />
                  <p>
                    問題と解説は、
                    <br />
                    問題ライブラリでも読めます。
                  </p>
                </div>
              </aside>
            </div>
            <section className="discover-section">
              <div className="section-title-row">
                <div>
                  <h2>{CATEGORIES.length}ジャンルから選ぶ</h2>
                </div>
                <button
                  className="text-link"
                  onClick={() => setPage("library")}
                >
                  すべての問題を見る
                  <ArrowRight size={16} />
                </button>
              </div>
              <div className="category-grid">
                {CATEGORIES.map((c) => (
                  <button
                    className="category-card"
                    key={c.id}
                    onClick={() => {
                      setChallengeMode("quiz");
                      setConfig((v) => ({ ...v, categories: [c.id] }));
                      configRef.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }}
                  >
                    <span
                      className="category-art"
                      style={{
                        color: c.color,
                        backgroundColor: `${c.color}12`,
                      }}
                    >
                      <CategoryIcon id={c.id} size={24} />
                    </span>
                    <h3>
                      {c.name}
                      <ArrowUpRight size={14} />
                    </h3>
                    <p>{c.description}</p>
                    <small>
                      {questions.filter((q) => q.category === c.id).length}問
                      <span>初級〜上級</span>
                    </small>
                  </button>
                ))}
              </div>
            </section>
            <section className="how-it-works">
              <div>
                <span>01</span>
                <h3>クイズを選ぶ</h3>
                <p>標準診断か、条件を選べる自由練習。</p>
              </div>
              <ArrowRight size={18} />
              <div>
                <span>02</span>
                <h3>答えと解説を確認</h3>
                <p>全問に解説付き。標準診断では終了後に表示。</p>
              </div>
              <ArrowRight size={18} />
              <div>
                <span>03</span>
                <h3>ジャンル別の成績を見る</h3>
                <p>正答率を比較し、間違えた問題を復習。</p>
              </div>
            </section>
          </>
        )}

        {page === "quiz" &&
          session &&
          currentQuestion &&
          currentItem &&
          questionCategory && (
            <div className="quiz-container">
              <div className="quiz-toolbar">
                <button
                  className="text-link muted"
                  onClick={() => setPage("home")}
                >
                  <ArrowLeft size={16} />
                  中断して戻る
                </button>
                <span className="pill">
                  {inDiagnostic
                    ? `${diagnosticName(session.config.diagnosticVersion)} · 60問`
                    : session.config.mode === "review"
                      ? "復習"
                      : `${difficultyName(session.config.difficulty)}コース`}
                </span>
                <span className="save-note">
                  <ShieldCheck size={14} />
                  {storageError ? "保存できません" : "自動保存中"}
                </span>
              </div>
              <div className="quiz-progress-label">
                <span>
                  QUESTION <b>{String(session.index + 1).padStart(2, "0")}</b>
                  <small> / {session.items.length}</small>
                </span>
                <span>
                  {Math.round(
                    (session.answers.filter((a) => a !== null).length /
                      session.items.length) *
                      100,
                  )}
                  % 完了
                </span>
              </div>
              <div className="progress-track quiz-progress">
                <span
                  style={{
                    width: `${(session.answers.filter((a) => a !== null).length / session.items.length) * 100}%`,
                  }}
                />
              </div>
              <section className="panel question-panel">
                <div className="question-meta">
                  <span
                    className="category-tag"
                    style={{ color: questionCategory.color }}
                  >
                    <CategoryIcon id={currentQuestion.category} size={16} />
                    {questionCategory.name}
                  </span>
                  <span
                    className={`pill difficulty-${currentQuestion.difficulty}`}
                  >
                    {difficultyName(currentQuestion.difficulty)}
                  </span>
                </div>
                <h1 ref={titleRef} tabIndex={-1}>
                  {currentQuestion.prompt}
                </h1>
                <QuestionImage question={currentQuestion} />
                <p className="answer-hint">正しい答えを1つ選んでください。</p>
                <div className="answer-options">
                  {currentItem.order.map((original, display) => {
                    const correct = original === currentQuestion.answer;
                    const active = answered
                      ? currentAnswer === display
                      : selected === display;
                    return (
                      <button
                        key={display}
                        aria-pressed={active}
                        disabled={answered}
                        onClick={() => setSelected(display)}
                        className={`answer-option ${active ? "chosen" : ""} ${showFeedback && correct ? "correct" : ""} ${showFeedback && active && !correct ? "incorrect" : ""}`}
                      >
                        <span className="answer-letter">
                          {String.fromCharCode(65 + display)}
                        </span>
                        <span>{currentQuestion.choices[original]}</span>
                        {showFeedback && correct ? (
                          <CheckCircle2 size={21} />
                        ) : showFeedback && active ? (
                          <XCircle size={21} />
                        ) : active ? (
                          <span className="selection-dot" />
                        ) : null}
                      </button>
                    );
                  })}
                </div>
                {answered && inDiagnostic && (
                  <div className="diagnostic-saved" role="status">
                    <CheckCircle2 size={19} />
                    <p>
                      回答を記録しました。正解と解説は診断の最後に表示します。
                    </p>
                  </div>
                )}
                {showFeedback && (
                  <div
                    className={`answer-feedback ${currentItem.order[currentAnswer] === currentQuestion.answer ? "positive" : "negative"}`}
                    role="status"
                  >
                    <div className="feedback-title">
                      {currentItem.order[currentAnswer] ===
                      currentQuestion.answer ? (
                        <>
                          <CheckCircle2 size={23} />
                          <strong>正解です</strong>
                        </>
                      ) : (
                        <>
                          <Lightbulb size={23} />
                          <strong>不正解です</strong>
                        </>
                      )}
                    </div>
                    {currentItem.order[currentAnswer] !==
                      currentQuestion.answer && (
                      <p className="correct-answer">
                        正解：{currentQuestion.choices[currentQuestion.answer]}
                      </p>
                    )}
                    <p>{currentQuestion.explanation}</p>
                    <Source question={currentQuestion} />
                  </div>
                )}
                <div className="question-actions">
                  {answered ? (
                    <button className="button primary" onClick={next}>
                      {session.index === session.items.length - 1
                        ? "結果を見る"
                        : "次の問題へ"}
                      <ArrowRight size={18} />
                    </button>
                  ) : (
                    <button
                      className="button primary"
                      disabled={selected === null}
                      onClick={answer}
                    >
                      回答を確定する
                      <Check size={18} />
                    </button>
                  )}
                </div>
              </section>
              <p className="quiz-bottom-note">
                <Leaf size={14} />
                「中断して戻る」で、途中のクイズを残せます。
              </p>
            </div>
          )}

        {page === "result" && result && stats && grade && (
          <>
            <div className="page-heading">
              <div>
                <h1 ref={titleRef} tabIndex={-1}>
                  クイズの結果
                </h1>
                <p>
                  {dateFormat.format(result.finishedAt)} ·{" "}
                  {standardResult
                    ? diagnosticName(result.config.diagnosticVersion)
                    : difficultyName(result.config.difficulty)}{" "}
                  · {result.items.length}問
                  {result.config.mode === "review" ? " · 復習" : ""}
                </p>
              </div>
              <button
                className="button secondary small"
                onClick={() => setPage("home")}
              >
                <ArrowLeft size={15} />
                ホームへ
              </button>
            </div>
            {resultHasRetiredQuestions && (
              <div className="content-notice">
                <p>
                  改訂前の問題を含む結果です。当時の問題と正解を表示します。完了した回数と累計正答率の集計には含めません。差し替えられた問題は復習できません。
                </p>
              </div>
            )}
            <div className="result-grid">
              <section className="panel score-panel">
                <div className="eyebrow subtle">
                  {standardResult
                    ? "標準診断"
                    : result.config.mode === "review"
                      ? "復習"
                      : "自由練習"}
                </div>
                <h2>
                  {resultHasRetiredQuestions
                    ? "改訂前のスコア"
                    : result.config.mode === "review"
                      ? "復習スコア"
                      : standardResult
                        ? "標準診断の一般常識度"
                        : result.config.categories.length ===
                            (resultUsesLegacyCategories
                              ? LEGACY_CATEGORIES.length
                              : CATEGORIES.length)
                          ? "自由練習のスコア"
                          : "選んだジャンルのスコア"}
                </h2>
                <div className="score-number">
                  {stats.percent}
                  <span>/ 100</span>
                </div>
                <div className="grade-title">
                  <span>{grade.rank}</span>
                  <h3>{grade.name}</h3>
                  <Sparkles size={22} />
                </div>
                <p className="grade-message">{grade.message}</p>
                <div className="score-details">
                  <div>
                    <span>正解数</span>
                    <strong>
                      {stats.correct}
                      <small> / {result.items.length}問</small>
                    </strong>
                  </div>
                  <div>
                    <span>正答率</span>
                    <strong>
                      {stats.percent}
                      <small>%</small>
                    </strong>
                  </div>
                </div>
                <p className="score-note">
                  得点は、正解数 ÷ 出題数 × 100 を四捨五入した値です。
                  <br />
                  {standardResult
                    ? `${diagnosticName(result.config.diagnosticVersion)}：各ジャンル5問・画像12問の固定配分です。`
                    : "自由練習・復習のランクは、その出題条件での目安です。"}
                </p>
                <details className="grade-guide">
                  <summary>
                    ランクの基準を見る
                    <ChevronDown size={14} />
                  </summary>
                  <p>
                    S：90点〜 ／ A：75点〜 ／ B：60点〜
                    <br />
                    C：40点〜 ／ D：40点未満
                  </p>
                </details>
              </section>
              <section className="panel result-radar">
                <div className="mini-heading">
                  <span>
                    <Target size={19} />
                    ジャンル別の正答率
                  </span>
                  <span className="pill light">正答率 %</span>
                </div>
                <Radar
                  scores={stats.scores}
                  legacy={resultUsesLegacyCategories}
                />
                <p>
                  <span className="legend-dot" />
                  今回の結果
                  {stats.scores.some((s) => s.percent === null) && (
                    <small> · 未出題のジャンルは未測定</small>
                  )}
                </p>
              </section>
            </div>
            {standardResult && (
              <section className="panel diagnostic-comparison">
                <div>
                  <h2>前回の標準診断と比べる</h2>
                  <p>
                    同じ「{diagnosticName(result.config.diagnosticVersion)}
                    」の結果と比較します。
                  </p>
                </div>
                {previousDiagnostic ? (
                  <div className="comparison-values">
                    <span>
                      前回<b>{resultSummary(previousDiagnostic).percent}点</b>
                    </span>
                    <ArrowRight size={20} />
                    <span>
                      今回<b>{stats.percent}点</b>
                    </span>
                    <strong>
                      {stats.percent -
                        resultSummary(previousDiagnostic).percent >
                      0
                        ? "+"
                        : ""}
                      {stats.percent -
                        resultSummary(previousDiagnostic).percent}
                      点
                    </strong>
                  </div>
                ) : (
                  <p>
                    同じ標準診断の過去の結果がないため、今回は比較を表示しません。
                  </p>
                )}
                <small>
                  出題は毎回変わります。これは学習の目安で、統計的に標準化された検査ではありません。
                </small>
              </section>
            )}
            <section className="panel breakdown-panel">
              <div className="section-title-row">
                <h2>ジャンル別の正解数</h2>
                <span className="label-note">今回の回答から</span>
              </div>
              <div className="breakdown-grid">
                {stats.scores.map((s) => {
                  const c = categoryFor(s.category, resultUsesLegacyCategories);
                  return (
                    <div className="breakdown-item" key={c.id}>
                      <span
                        className="breakdown-icon"
                        style={{ color: c.color }}
                      >
                        <CategoryIcon id={c.id} />
                      </span>
                      <div className="breakdown-content">
                        <div>
                          <span>{c.name}</span>
                          <b>
                            {s.percent === null ? "未測定" : `${s.percent}%`}
                          </b>
                        </div>
                        <div className="progress-track">
                          <span
                            style={{
                              width: `${s.percent ?? 0}%`,
                              backgroundColor: c.color,
                            }}
                          />
                        </div>
                        <small>
                          {s.total
                            ? `${s.correct} / ${s.total}問正解${s.total < 3 ? " · 出題数が少ないため参考値" : ""}`
                            : "このジャンルの出題はありません"}
                        </small>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="insight">
                <Lightbulb size={20} />
                <p>
                  {(() => {
                    const measured = [...stats.scores]
                      .filter((s) => s.percent !== null)
                      .sort((a, b) => a.percent! - b.percent!);
                    if (measured.every((s) => s.percent === 100))
                      return "今回は全問正解でした。各問題の解説は、下の「すべて」から確認できます。";
                    const weak = measured
                      .filter((s) => s.percent === measured[0].percent)
                      .map(
                        (s) =>
                          categoryFor(s.category, resultUsesLegacyCategories)
                            .name,
                      );
                    return (
                      <>
                        今回は<strong>{weak.join("・")}</strong>
                        の正答率が最も低い結果でした。下の一覧で、間違えた問題と解説を確認できます。
                      </>
                    );
                  })()}
                </p>
              </div>
            </section>
            <div className="result-actions">
              <button
                className="button primary"
                disabled={!reviewableWrongIds.size}
                onClick={() => startReview(reviewableWrongIds)}
              >
                <RotateCcw size={17} />
                間違えた{reviewableWrongIds.size}問を復習
              </button>
              <button
                className="button secondary"
                onClick={() => {
                  setChallengeMode(standardResult ? "diagnostic" : "quiz");
                  setConfig({
                    ...(resultHasRetiredQuestions || standardResult
                      ? initialConfig
                      : result.config),
                    mode: "quiz",
                    count:
                      resultHasRetiredQuestions ||
                      standardResult ||
                      result.config.mode === "review"
                        ? 24
                        : [12, 24, 48, 96, questions.length].includes(
                              result.config.count,
                            )
                          ? result.config.count
                          : questions.length,
                  });
                  setPage("home");
                }}
              >
                <Compass size={17} />
                次のクイズを選ぶ
              </button>
            </div>
            <section className="review-section">
              <div className="section-title-row">
                <h2>回答と解説</h2>
                <div className="segmented">
                  <button
                    className={reviewFilter === "wrong" ? "active" : ""}
                    aria-pressed={reviewFilter === "wrong"}
                    onClick={() => setReviewFilter("wrong")}
                  >
                    間違えた問題
                  </button>
                  <button
                    className={reviewFilter === "all" ? "active" : ""}
                    aria-pressed={reviewFilter === "all"}
                    onClick={() => setReviewFilter("all")}
                  >
                    すべて
                  </button>
                </div>
              </div>
              {stats.correct === result.items.length &&
              reviewFilter === "wrong" ? (
                <div className="empty-state compact">
                  <Trophy size={30} />
                  <h3>全問正解です</h3>
                  <p>「すべて」を選ぶと、正解した問題の解説も読めます。</p>
                </div>
              ) : (
                result.items.map((item, i) => {
                  const q = questionMap.get(item.questionId)!;
                  const correct = item.order[result.answers[i]] === q.answer;
                  if (reviewFilter === "wrong" && correct) return null;
                  return (
                    <details className="review-item" key={q.id}>
                      <summary>
                        <span
                          className={correct ? "success-color" : "error-color"}
                        >
                          {correct ? (
                            <CheckCircle2 size={18} />
                          ) : (
                            <XCircle size={18} />
                          )}
                        </span>
                        <small>Q{String(i + 1).padStart(2, "0")}</small>
                        <span>{q.prompt}</span>
                        <ChevronDown size={17} />
                      </summary>
                      <div className="review-body">
                        <QuestionImage question={q} compact />
                        <p className={!correct ? "error-color" : ""}>
                          あなたの回答：
                          {q.choices[item.order[result.answers[i]]]}
                        </p>
                        <p className="success-color">
                          <strong>正解：{q.choices[q.answer]}</strong>
                        </p>
                        <p>{q.explanation}</p>
                        <Source question={q} />
                      </div>
                    </details>
                  );
                })
              )}
            </section>
          </>
        )}

        {page === "history" && (
          <>
            <div className="page-heading">
              <div>
                <h1 ref={titleRef} tabIndex={-1}>
                  学習の記録
                </h1>
                <p>
                  過去の結果を確認したり、間違えた問題を復習したりできます。
                </p>
              </div>
              {(history.length > 0 || studied > 0) && (
                <button
                  className="icon-button"
                  aria-label="学習履歴を削除"
                  onClick={() => setClearPending(true)}
                >
                  <Trash2 size={19} />
                </button>
              )}
            </div>
            <div className="history-stats">
              <div className="panel">
                <span>
                  <Compass size={18} />
                  完了した回数
                </span>
                <strong>
                  {currentHistory.length}
                  <small>回</small>
                </strong>
              </div>
              <div className="panel">
                <span>
                  <BookOpen size={18} />
                  出題済みの問題
                </span>
                <strong>
                  {studied}
                  <small>/ {questions.length}問</small>
                </strong>
              </div>
              <div className="panel">
                <span>
                  <Target size={18} />
                  最新の{diagnosticName(DIAGNOSTIC_VERSION)}
                </span>
                <strong>
                  {latestDiagnostic
                    ? resultSummary(latestDiagnostic).percent
                    : "—"}
                  <small>{latestDiagnostic ? "点" : ""}</small>
                </strong>
              </div>
            </div>
            {!history.length && !wrongIds.size ? (
              <section className="panel empty-state">
                <span className="empty-icon">
                  <BookOpen size={36} strokeWidth={1.3} />
                </span>
                <h2>保存された結果はありません</h2>
                <p>
                  クイズを最後まで回答すると、
                  <br />
                  結果とレーダーチャートがここに保存されます。
                </p>
                <button
                  className="button primary"
                  onClick={() => setPage("home")}
                >
                  クイズに挑戦する
                  <ArrowRight size={17} />
                </button>
              </section>
            ) : (
              <>
                <section className="review-banner">
                  <div>
                    <RotateCcw size={24} />
                    <div>
                      <h2>間違えた問題を復習</h2>
                      <p>
                        最後に答えたときに間違えた問題が{wrongIds.size}
                        問あります。
                      </p>
                    </div>
                  </div>
                  <button
                    className="button primary small"
                    disabled={!wrongIds.size}
                    onClick={() => startReview(wrongIds)}
                  >
                    まとめて復習
                    <ArrowRight size={16} />
                  </button>
                </section>
                <div className="section-title-row">
                  <h2>過去の結果</h2>
                  <span className="label-note">最新50回まで保存</span>
                </div>
                <div className="history-list">
                  {history.map((r) => {
                    const s = resultSummary(r);
                    return (
                      <button
                        key={r.id}
                        className="panel history-row"
                        onClick={() => viewResult(r)}
                      >
                        <span className="history-grade">
                          {getGrade(s.percent).rank}
                        </span>
                        <div>
                          <strong>
                            {isStandardDiagnostic(r)
                              ? diagnosticName(r.config.diagnosticVersion)
                              : r.config.mode === "review"
                                ? "復習"
                                : r.config.categories.length ===
                                    (usesLegacyCategories(r)
                                      ? LEGACY_CATEGORIES.length
                                      : CATEGORIES.length)
                                  ? "全ジャンルの自由練習"
                                  : r.config.categories
                                      .map(
                                        (id) =>
                                          categoryFor(
                                            id,
                                            usesLegacyCategories(r),
                                          ).name,
                                      )
                                      .join("・")}
                          </strong>
                          <p>
                            {dateFormat.format(r.finishedAt)}
                            <span>·</span>
                            {isStandardDiagnostic(r)
                              ? "固定配分"
                              : difficultyName(r.config.difficulty)}
                            <span>·</span>
                            {r.items.length}問
                            {r.items.some(
                              (item) => !activeQuestionIds.has(item.questionId),
                            ) && <span className="pill">改訂前</span>}
                          </p>
                        </div>
                        <span className="history-score">
                          {s.percent}
                          <small>点</small>
                          <em>{s.correct}問正解</em>
                        </span>
                        <ChevronRight size={20} />
                      </button>
                    );
                  })}
                </div>
                {last && (
                  <p className="history-note">
                    回数と累計正答率は、保存中の最新50回のうち、現在の問題だけで解いた結果から計算します。出題済みの問題と直近の正誤は50回を超えても残り、中断したクイズで表示した問題も含みます。記録はこのブラウザーに保存します。
                  </p>
                )}
              </>
            )}
          </>
        )}

        {page === "library" && (
          <>
            <div className="page-heading">
              <div>
                <h1 ref={titleRef} tabIndex={-1}>
                  問題ライブラリ
                </h1>
                <p>
                  {questions.length}
                  問を掲載しています。ジャンルや題材で絞り込んで、正解と解説を読めます。
                </p>
              </div>
              <span className="library-icon">
                <BookOpen size={35} strokeWidth={1.4} />
              </span>
            </div>
            <section className="panel library-filters">
              <label className="search-field">
                <Search size={19} />
                <input
                  aria-label="問題を検索"
                  value={librarySearch}
                  onChange={(e) => setLibrarySearch(e.target.value)}
                  placeholder="題材・問題・答え・解説から検索"
                />
                {librarySearch && (
                  <button
                    aria-label="検索をクリア"
                    onClick={() => setLibrarySearch("")}
                  >
                    <X size={15} />
                  </button>
                )}
              </label>
              <select
                aria-label="ライブラリのジャンル"
                value={libraryCategory}
                onChange={(e) => {
                  setLibraryCategory(e.target.value);
                  setLibraryTopic("all");
                }}
              >
                <option value="all">すべてのジャンル</option>
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <select
                aria-label="ライブラリの題材"
                value={libraryTopic}
                onChange={(e) => setLibraryTopic(e.target.value)}
              >
                <option value="all">すべての題材</option>
                {[
                  ...new Set(
                    questions
                      .filter(
                        (q) =>
                          libraryCategory === "all" ||
                          q.category === libraryCategory,
                      )
                      .map((q) => q.topic)
                      .filter(Boolean),
                  ),
                ]
                  .sort((a, b) => a!.localeCompare(b!, "ja"))
                  .map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
              </select>
              <select
                aria-label="ライブラリの難易度"
                value={libraryDifficulty}
                onChange={(e) => setLibraryDifficulty(e.target.value)}
              >
                <option value="all">すべての難易度</option>
                {DIFFICULTIES.filter((d) => d.id !== "mix").map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
              <select
                aria-label="ライブラリの出題形式"
                value={libraryFormat}
                onChange={(e) => setLibraryFormat(e.target.value)}
              >
                <option value="all">すべての出題形式</option>
                <option value="image">画像問題</option>
                <option value="text">文章問題</option>
              </select>
            </section>
            <div className="section-title-row library-count">
              <span>
                <b>{libraryQuestions.length}</b> 問
              </span>
              <small>開くと正解と解説を確認できます</small>
            </div>
            {!libraryQuestions.length ? (
              <div className="empty-state">
                <Search size={30} />
                <h2>一致する問題が見つかりませんでした。</h2>
                <p>キーワードや絞り込み条件を変えてみてください。</p>
                <button
                  className="button secondary"
                  onClick={() => {
                    setLibrarySearch("");
                    setLibraryCategory("all");
                    setLibraryDifficulty("all");
                    setLibraryTopic("all");
                    setLibraryFormat("all");
                  }}
                >
                  条件をリセット
                </button>
              </div>
            ) : (
              <>
                <div className="library-list">
                  {libraryQuestions
                    .slice(libraryPage * 20, (libraryPage + 1) * 20)
                    .map((q) => (
                      <details className="library-question panel" key={q.id}>
                        <summary>
                          <span className="library-meta">
                            <span className="category-tag">
                              <CategoryIcon id={q.category} size={14} />
                              {categoryFor(q.category).name}
                            </span>
                            <span className={`pill difficulty-${q.difficulty}`}>
                              {difficultyName(q.difficulty)}
                            </span>
                            <span className="topic-label">{q.topic}</span>
                            {q.image && (
                              <span className="pill image-tag">画像問題</span>
                            )}
                          </span>
                          <span className="library-prompt">{q.prompt}</span>
                          <ChevronDown size={17} />
                        </summary>
                        <div className="library-answer">
                          <QuestionImage question={q} compact />
                          <div className="library-choices">
                            {q.choices.map((choice, i) => (
                              <div
                                className={i === q.answer ? "is-correct" : ""}
                                key={i}
                              >
                                <span>{String.fromCharCode(65 + i)}</span>
                                {choice}
                                {i === q.answer && (
                                  <>
                                    <span className="sr-only">（正解）</span>
                                    <CheckCircle2 size={16} />
                                  </>
                                )}
                              </div>
                            ))}
                          </div>
                          <p>{q.explanation}</p>
                          <Source question={q} />
                        </div>
                      </details>
                    ))}
                </div>
                <div className="pagination">
                  <button
                    className="button secondary small"
                    disabled={libraryPage === 0}
                    onClick={() => {
                      setLibraryPage((p) => p - 1);
                      window.scrollTo({ top: 0 });
                    }}
                  >
                    <ArrowLeft size={16} />
                    前へ
                  </button>
                  <span>
                    {libraryPage + 1} /{" "}
                    {Math.ceil(libraryQuestions.length / 20)}
                  </span>
                  <button
                    className="button secondary small"
                    disabled={(libraryPage + 1) * 20 >= libraryQuestions.length}
                    onClick={() => {
                      setLibraryPage((p) => p + 1);
                      window.scrollTo({ top: 0 });
                    }}
                  >
                    次へ
                    <ArrowRight size={16} />
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </main>
      <footer className="site-footer">
        <div>
          <span className="footer-brand">
            <BookOpen size={17} />
            常識のものさし
          </span>
          <p>暮らし・仕事・教養の一般常識クイズ</p>
        </div>
        <small>回答と結果はこのブラウザーに保存されます</small>
        <span className="footer-end">
          全問に解説付き <Flower2 size={17} />
        </span>
      </footer>
      {(replacePending || clearPending) && (
        <ConfirmDialog
          title={
            replacePending
              ? "新しいクイズをはじめますか？"
              : "学習の記録を削除しますか？"
          }
          text={
            replacePending
              ? "途中のクイズは破棄され、新しいクイズが始まります。完了済みの結果は残ります。"
              : "保存済みの結果、出題済みの記録、復習リストを削除します。元には戻せません。途中のクイズは残り、再開して表示した問題から新しく記録します。"
          }
          confirm={replacePending ? "新しくはじめる" : "記録を削除する"}
          onCancel={() => {
            setReplacePending(null);
            setClearPending(false);
          }}
          onConfirm={() => {
            if (replacePending) replacePending();
            else {
              setHistory([]);
              setLearning({});
              setResult(null);
              setClearPending(false);
            }
          }}
        />
      )}
    </>
  );
}

function ConfirmDialog({
  title,
  text,
  confirm,
  onCancel,
  onConfirm,
}: {
  title: string;
  text: string;
  confirm: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current!;
    dialog.showModal();
    return () => dialog.close();
  }, []);
  return (
    <dialog
      className="confirm-dialog"
      ref={ref}
      aria-labelledby="confirm-title"
      aria-describedby="confirm-text"
      onCancel={(e) => {
        e.preventDefault();
        onCancel();
      }}
    >
      <h2 id="confirm-title">{title}</h2>
      <p id="confirm-text">{text}</p>
      <div>
        <button autoFocus className="button secondary" onClick={onCancel}>
          キャンセル
        </button>
        <button className="button primary" onClick={onConfirm}>
          {confirm}
        </button>
      </div>
    </dialog>
  );
}
