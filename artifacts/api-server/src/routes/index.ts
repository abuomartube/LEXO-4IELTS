import { Router, type IRouter } from "express";
import healthRouter from "./health";
import flashcardsRouter from "./flashcards";
import vocabPdfRouter from "./vocab-pdf";
import authRouter from "./auth";
import essayCheckRouter from "./essay-check";
import storiesRouter from "./stories";
import speakingRouter from "./speaking";
import notificationsRouter from "./notifications";
import lexoAiRouter from "./lexo-ai";
import orwellRouter from "./orwell";
import lessonsRouter from "./lessons";
import sentenceCheckRouter from "./sentence-check";
import sentenceSessionsRouter from "./sentence-sessions";
import spellItRouter from "./spell-it";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(flashcardsRouter);
router.use(vocabPdfRouter);
router.use(essayCheckRouter);
router.use(storiesRouter);
router.use(speakingRouter);
router.use(notificationsRouter);
router.use(lexoAiRouter);
router.use(orwellRouter);
router.use(lessonsRouter);
router.use(sentenceCheckRouter);
router.use(sentenceSessionsRouter);
router.use(spellItRouter);

export default router;
