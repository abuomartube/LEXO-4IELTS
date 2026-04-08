import { Router, type IRouter } from "express";
import healthRouter from "./health";
import flashcardsRouter from "./flashcards";
import vocabPdfRouter from "./vocab-pdf";

const router: IRouter = Router();

router.use(healthRouter);
router.use(flashcardsRouter);
router.use(vocabPdfRouter);

export default router;
