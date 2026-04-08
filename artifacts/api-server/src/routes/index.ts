import { Router, type IRouter } from "express";
import healthRouter from "./health";
import flashcardsRouter from "./flashcards";
import vocabPdfRouter from "./vocab-pdf";
import authRouter from "./auth";
import essayCheckRouter from "./essay-check";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(flashcardsRouter);
router.use(vocabPdfRouter);
router.use(essayCheckRouter);

export default router;
