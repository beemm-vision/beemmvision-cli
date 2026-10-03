#!/usr/bin/env node
import { createRequire } from 'module'; const require = createRequire(import.meta.url);
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../packages/workflow-contracts/dist/portableWorkflow.js
var require_portableWorkflow = __commonJS({
  "../packages/workflow-contracts/dist/portableWorkflow.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createMockPortableWorkflowExport = exports.DEFAULT_PORTABLE_WORKFLOW_EXECUTION_STATE = exports.WorkflowImportResultSchema = exports.PortableWorkflowExportSchema = exports.PortableWorkflowDocumentSchema = exports.PortableWorkflowMetaSchema = exports.PortableWorkflowSchema = exports.PortableWorkflowAppConfigSchema = exports.PortableWorkflowEdgeSchema = exports.PortableWorkflowNodeSchema = exports.PortableWorkflowNodeAppExposureSchema = exports.PortableWorkflowExecutionStateSchema = void 0;
    var zod_1 = __require("zod");
    exports.PortableWorkflowExecutionStateSchema = zod_1.z.object({
      status: zod_1.z.literal("IDLE"),
      error: zod_1.z.null(),
      outputUrl: zod_1.z.null(),
      outputMimeType: zod_1.z.null(),
      outputData: zod_1.z.null()
    });
    exports.PortableWorkflowNodeAppExposureSchema = zod_1.z.object({
      role: zod_1.z.enum(["na", "input", "output"]),
      label: zod_1.z.string().min(1).nullable().optional(),
      field: zod_1.z.string().min(1).nullable().optional(),
      dataType: zod_1.z.enum(["text", "number", "boolean", "image", "file", "video", "generic"]).nullable().optional()
    });
    exports.PortableWorkflowNodeSchema = zod_1.z.object({
      id: zod_1.z.string().min(1),
      type: zod_1.z.string().min(1),
      label: zod_1.z.string().min(1).optional(),
      position: zod_1.z.object({
        x: zod_1.z.number().finite(),
        y: zod_1.z.number().finite()
      }),
      parentId: zod_1.z.string().min(1).nullable().optional(),
      extent: zod_1.z.enum(["parent", "viewport"]).nullable().optional(),
      inputs: zod_1.z.record(zod_1.z.string(), zod_1.z.unknown()),
      bypass: zod_1.z.boolean().optional(),
      appExposure: exports.PortableWorkflowNodeAppExposureSchema.nullable().optional(),
      executionState: exports.PortableWorkflowExecutionStateSchema
    });
    exports.PortableWorkflowEdgeSchema = zod_1.z.object({
      id: zod_1.z.string().min(1),
      source: zod_1.z.string().min(1),
      sourceHandle: zod_1.z.string().min(1).nullable().optional(),
      target: zod_1.z.string().min(1),
      targetHandle: zod_1.z.string().min(1).nullable().optional(),
      label: zod_1.z.string().min(1).nullable().optional()
    });
    exports.PortableWorkflowAppConfigSchema = zod_1.z.object({
      enabled: zod_1.z.boolean(),
      inputNodeIds: zod_1.z.array(zod_1.z.string().min(1)),
      outputNodeIds: zod_1.z.array(zod_1.z.string().min(1))
    });
    exports.PortableWorkflowSchema = zod_1.z.object({
      name: zod_1.z.string().min(1),
      camera: zod_1.z.object({
        x: zod_1.z.number().finite(),
        y: zod_1.z.number().finite(),
        zoom: zod_1.z.number().finite()
      }),
      appConfig: exports.PortableWorkflowAppConfigSchema.nullable().optional()
    });
    exports.PortableWorkflowMetaSchema = zod_1.z.object({
      exportedAt: zod_1.z.string().min(1),
      sourceProjectId: zod_1.z.string().min(1),
      sourceWorkflowId: zod_1.z.string().min(1)
    });
    exports.PortableWorkflowDocumentSchema = zod_1.z.object({
      version: zod_1.z.literal(1),
      workflow: exports.PortableWorkflowSchema,
      nodes: zod_1.z.array(exports.PortableWorkflowNodeSchema),
      edges: zod_1.z.array(exports.PortableWorkflowEdgeSchema),
      meta: exports.PortableWorkflowMetaSchema
    });
    exports.PortableWorkflowExportSchema = exports.PortableWorkflowDocumentSchema;
    exports.WorkflowImportResultSchema = zod_1.z.object({
      importMode: zod_1.z.enum(["replace", "append"]),
      workflowName: zod_1.z.string().min(1),
      importedNodeCount: zod_1.z.number().int().nonnegative(),
      importedEdgeCount: zod_1.z.number().int().nonnegative()
    });
    exports.DEFAULT_PORTABLE_WORKFLOW_EXECUTION_STATE = {
      status: "IDLE",
      error: null,
      outputUrl: null,
      outputMimeType: null,
      outputData: null
    };
    var createMockPortableWorkflowExport2 = (params) => {
      const portableWorkflow = {
        version: 1,
        workflow: {
          name: "Mock Workflow Export",
          camera: {
            x: 0,
            y: 0,
            zoom: 1
          },
          appConfig: null
        },
        nodes: [
          {
            id: "node_import_starter",
            type: "import",
            label: "Import",
            position: { x: 120, y: 200 },
            inputs: {
              value: "",
              file: ""
            },
            appExposure: { role: "input", dataType: "image", field: "value" },
            executionState: exports.DEFAULT_PORTABLE_WORKFLOW_EXECUTION_STATE
          },
          {
            id: "node_text_starter",
            type: "text",
            label: "Texte",
            position: { x: 120, y: 520 },
            inputs: {
              value: "Decrivez la transformation souhaitee pour votre image importee.",
              width: 400,
              height: 220
            },
            appExposure: { role: "input", dataType: "text", field: "value" },
            executionState: exports.DEFAULT_PORTABLE_WORKFLOW_EXECUTION_STATE
          },
          {
            id: "node_prompt_enhancer_starter",
            type: "promptEnhancer",
            label: "Prompt Enhancer",
            position: { x: 620, y: 520 },
            inputs: {
              model: "google/gemini-2.5-flash",
              prompt: "",
              system_prompt: "Transform the prompt into a precise creative brief."
            },
            executionState: exports.DEFAULT_PORTABLE_WORKFLOW_EXECUTION_STATE
          },
          {
            id: "node_image_model_starter",
            type: "imageModel",
            label: "Nano Banana 2",
            position: { x: 1020, y: 320 },
            inputs: {
              modelId: "nano-banana-2",
              prompt: "",
              seed: 424242,
              resolution: "1K",
              aspectRatio: "auto",
              dynamicInputs: {},
              imageInputCount: 1,
              randomSeed: true,
              outputFormat: "png"
            },
            appExposure: { role: "output", dataType: "image" },
            executionState: exports.DEFAULT_PORTABLE_WORKFLOW_EXECUTION_STATE
          }
        ],
        edges: [
          {
            id: "edge_starter_import_to_model",
            source: "node_import_starter",
            sourceHandle: "file",
            target: "node_image_model_starter",
            targetHandle: "image",
            label: "Image"
          },
          {
            id: "edge_starter_text_to_enhancer",
            source: "node_text_starter",
            sourceHandle: "text",
            target: "node_prompt_enhancer_starter",
            targetHandle: "prompt",
            label: "Prompt"
          },
          {
            id: "edge_starter_enhancer_to_model",
            source: "node_prompt_enhancer_starter",
            sourceHandle: "text",
            target: "node_image_model_starter",
            targetHandle: "prompt",
            label: "Prompt"
          }
        ],
        meta: {
          exportedAt: (/* @__PURE__ */ new Date("2026-03-04T11:20:00.000Z")).toISOString(),
          sourceProjectId: params.projectId,
          sourceWorkflowId: params.workflowId
        }
      };
      return exports.PortableWorkflowExportSchema.parse(portableWorkflow);
    };
    exports.createMockPortableWorkflowExport = createMockPortableWorkflowExport2;
  }
});

// ../packages/workflow-contracts/dist/catalog.js
var require_catalog = __commonJS({
  "../packages/workflow-contracts/dist/catalog.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TemplateDuplicateResultSchema = exports.TemplateGetResultSchema = exports.TemplateListResultSchema = exports.TemplateSummarySchema = exports.WorkflowTemplateStatusSchema = exports.WorkflowListResultSchema = exports.WorkflowListItemSchema = exports.ProjectListResultSchema = exports.ProjectSummarySchema = void 0;
    var zod_1 = __require("zod");
    var portableWorkflow_1 = require_portableWorkflow();
    exports.ProjectSummarySchema = zod_1.z.object({
      projectId: zod_1.z.string().min(1),
      name: zod_1.z.string().min(1),
      type: zod_1.z.enum(["board", "workflow"]).nullable(),
      ownerId: zod_1.z.string().min(1),
      ownerName: zod_1.z.string().min(1),
      updatedAt: zod_1.z.string().nullable(),
      lastOpenedAt: zod_1.z.string().nullable()
    });
    exports.ProjectListResultSchema = zod_1.z.object({
      projectCount: zod_1.z.number().int().nonnegative(),
      projects: zod_1.z.array(exports.ProjectSummarySchema)
    });
    exports.WorkflowListItemSchema = zod_1.z.object({
      workflowId: zod_1.z.string().min(1),
      name: zod_1.z.string().min(1),
      updatedAt: zod_1.z.string().nullable(),
      lastExecutedAt: zod_1.z.string().nullable(),
      appConfigEnabled: zod_1.z.boolean()
    });
    exports.WorkflowListResultSchema = zod_1.z.object({
      projectId: zod_1.z.string().min(1),
      workflowCount: zod_1.z.number().int().nonnegative(),
      workflows: zod_1.z.array(exports.WorkflowListItemSchema)
    });
    exports.WorkflowTemplateStatusSchema = zod_1.z.enum(["pending", "approved", "rejected"]);
    exports.TemplateSummarySchema = zod_1.z.object({
      templateId: zod_1.z.string().min(1),
      title: zod_1.z.string().min(1),
      description: zod_1.z.string(),
      thumbnailUrl: zod_1.z.string().nullable(),
      creatorName: zod_1.z.string().min(1),
      creatorPhotoUrl: zod_1.z.string().nullable(),
      status: exports.WorkflowTemplateStatusSchema,
      includesGeneratedData: zod_1.z.boolean(),
      createdAt: zod_1.z.string().nullable(),
      updatedAt: zod_1.z.string().nullable()
    });
    exports.TemplateListResultSchema = zod_1.z.object({
      templateCount: zod_1.z.number().int().nonnegative(),
      templates: zod_1.z.array(exports.TemplateSummarySchema)
    });
    exports.TemplateGetResultSchema = zod_1.z.object({
      template: exports.TemplateSummarySchema,
      portableWorkflow: portableWorkflow_1.PortableWorkflowDocumentSchema
    });
    exports.TemplateDuplicateResultSchema = zod_1.z.object({
      templateId: zod_1.z.string().min(1),
      projectId: zod_1.z.string().min(1),
      workflowId: zod_1.z.string().min(1),
      projectName: zod_1.z.string().min(1),
      workflowName: zod_1.z.string().min(1)
    });
  }
});

// ../packages/workflow-contracts/dist/samyWorkflow.js
var require_samyWorkflow = __commonJS({
  "../packages/workflow-contracts/dist/samyWorkflow.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SamyWorkflowDraftResultSchema = exports.SamyGenerateWorkflowResponseSchema = exports.SamyWorkflowResponseSchema = exports.SamyQuestionsResponseSchema = exports.SanitizedSamyGenerateWorkflowRequestSchema = exports.SamyGenerateWorkflowRequestSchema = exports.SamyPromptAuditStepSchema = exports.SamyQuestionSchema = exports.SamyQuestionTypeSchema = exports.SamyGenerationStrategySchema = exports.SamyWorkflowStylePresetSchema = exports.SamyAssistantModeSchema = exports.WorkflowAssistantGenerateResponseSchema = exports.WorkflowAssistantWorkflowResponseSchema = exports.WorkflowAssistantQuestionsResponseSchema = exports.SanitizedWorkflowAssistantGenerateRequestSchema = exports.WorkflowAssistantGenerateRequestSchema = exports.WorkflowAssistantPromptAuditStepSchema = exports.WorkflowAssistantPromptAuditStepKindSchema = exports.WorkflowAssistantQuestionSchema = exports.WorkflowAssistantQuestionTypeSchema = exports.WorkflowAssistantGenerationStrategySchema = exports.WorkflowAssistantStylePresetSchema = exports.WorkflowAssistantModeSchema = void 0;
    var zod_1 = __require("zod");
    var portableWorkflow_1 = require_portableWorkflow();
    exports.WorkflowAssistantModeSchema = zod_1.z.enum([
      "eco",
      "fast",
      "premium",
      "pro",
      "deepseek-v3",
      "deepseek-v4-flash",
      "deepseek-v4-pro",
      "qwen3-32b",
      "qwen3-72b",
      "qwen25-72b",
      "kimi-k3",
      "glm-5.2",
      "gemini-3.5-flash",
      "gemini-3.6-flash",
      "minimax-m3"
    ]);
    exports.WorkflowAssistantStylePresetSchema = zod_1.z.enum([
      "default",
      "editorial",
      "graphic",
      "cinematic"
    ]);
    exports.WorkflowAssistantGenerationStrategySchema = zod_1.z.enum([
      "standard",
      "dashboard_bootstrap"
    ]);
    exports.WorkflowAssistantQuestionTypeSchema = zod_1.z.enum(["select", "text", "toggle"]);
    exports.WorkflowAssistantQuestionSchema = zod_1.z.object({
      id: zod_1.z.string().min(1),
      label: zod_1.z.string().min(1),
      type: exports.WorkflowAssistantQuestionTypeSchema,
      options: zod_1.z.array(zod_1.z.string()).optional(),
      placeholder: zod_1.z.string().optional(),
      required: zod_1.z.boolean().optional()
    });
    exports.WorkflowAssistantPromptAuditStepKindSchema = zod_1.z.enum([
      "clarification",
      "workflow_spec",
      "workflow_draft",
      "workflow_repair"
    ]);
    exports.WorkflowAssistantPromptAuditStepSchema = zod_1.z.object({
      step: exports.WorkflowAssistantPromptAuditStepKindSchema,
      openRouterModel: zod_1.z.string().min(1),
      systemLayers: zod_1.z.array(zod_1.z.object({
        id: zod_1.z.string().min(1),
        source: zod_1.z.string().min(1)
      })),
      userMessageSummary: zod_1.z.object({
        jsonKeys: zod_1.z.array(zod_1.z.string()),
        promptCharCount: zod_1.z.number().optional(),
        briefKeyCount: zod_1.z.number().optional(),
        repairAttempt: zod_1.z.number().optional(),
        validationErrorCount: zod_1.z.number().optional()
      }),
      note: zod_1.z.string().optional()
    });
    exports.WorkflowAssistantGenerateRequestSchema = zod_1.z.object({
      projectId: zod_1.z.string().min(1).optional(),
      workflowId: zod_1.z.string().min(1).optional(),
      prompt: zod_1.z.string().min(1),
      answers: zod_1.z.record(zod_1.z.string(), zod_1.z.union([zod_1.z.string(), zod_1.z.boolean(), zod_1.z.null()])).optional(),
      assistantMode: exports.WorkflowAssistantModeSchema.optional(),
      priorQuestionRounds: zod_1.z.number().int().nonnegative().optional(),
      workflowName: zod_1.z.string().min(1).optional(),
      stylePreset: exports.WorkflowAssistantStylePresetSchema.optional(),
      generationStrategy: exports.WorkflowAssistantGenerationStrategySchema.optional()
    });
    exports.SanitizedWorkflowAssistantGenerateRequestSchema = zod_1.z.object({
      projectId: zod_1.z.string().min(1).optional(),
      workflowId: zod_1.z.string().min(1).optional(),
      prompt: zod_1.z.string().min(1),
      answers: zod_1.z.record(zod_1.z.string(), zod_1.z.union([zod_1.z.string(), zod_1.z.boolean(), zod_1.z.null()])),
      assistantMode: exports.WorkflowAssistantModeSchema,
      priorQuestionRounds: zod_1.z.number().int().nonnegative(),
      workflowName: zod_1.z.string().min(1).optional(),
      stylePreset: exports.WorkflowAssistantStylePresetSchema,
      generationStrategy: exports.WorkflowAssistantGenerationStrategySchema
    });
    exports.WorkflowAssistantQuestionsResponseSchema = zod_1.z.object({
      kind: zod_1.z.literal("questions"),
      summary: zod_1.z.string().optional(),
      questions: zod_1.z.array(exports.WorkflowAssistantQuestionSchema),
      totalCost: zod_1.z.number().optional(),
      /** BV-341 — crédits débités pour cette ronde de questions (son prix propre). */
      creditsCharged: zod_1.z.number().optional(),
      trace: zod_1.z.array(zod_1.z.string()).optional(),
      promptAudit: zod_1.z.array(exports.WorkflowAssistantPromptAuditStepSchema).optional()
    });
    exports.WorkflowAssistantWorkflowResponseSchema = zod_1.z.object({
      kind: zod_1.z.literal("workflow"),
      workflowName: zod_1.z.string().min(1),
      portableWorkflow: portableWorkflow_1.PortableWorkflowExportSchema,
      warnings: zod_1.z.array(zod_1.z.string()),
      reasoningSummary: zod_1.z.string().optional(),
      totalCost: zod_1.z.number().optional(),
      /** BV-341 — crédits débités pour cette génération (forfait, clarification comprise). */
      creditsCharged: zod_1.z.number().optional(),
      trace: zod_1.z.array(zod_1.z.string()).optional(),
      promptAudit: zod_1.z.array(exports.WorkflowAssistantPromptAuditStepSchema).optional(),
      /**
       * Sprint 1 / B.2 — true si le workflow a été retourné en best-effort après
       * épuisement du repair budget (max attempts ou max coût $0.30).
       * Le client doit afficher un avertissement et permettre la régénération.
       */
      partial: zod_1.z.boolean().optional(),
      partialReason: zod_1.z.string().optional()
    });
    exports.WorkflowAssistantGenerateResponseSchema = zod_1.z.union([
      exports.WorkflowAssistantQuestionsResponseSchema,
      exports.WorkflowAssistantWorkflowResponseSchema
    ]);
    exports.SamyAssistantModeSchema = exports.WorkflowAssistantModeSchema;
    exports.SamyWorkflowStylePresetSchema = exports.WorkflowAssistantStylePresetSchema;
    exports.SamyGenerationStrategySchema = exports.WorkflowAssistantGenerationStrategySchema;
    exports.SamyQuestionTypeSchema = exports.WorkflowAssistantQuestionTypeSchema;
    exports.SamyQuestionSchema = exports.WorkflowAssistantQuestionSchema;
    exports.SamyPromptAuditStepSchema = exports.WorkflowAssistantPromptAuditStepSchema;
    exports.SamyGenerateWorkflowRequestSchema = exports.WorkflowAssistantGenerateRequestSchema;
    exports.SanitizedSamyGenerateWorkflowRequestSchema = exports.SanitizedWorkflowAssistantGenerateRequestSchema;
    exports.SamyQuestionsResponseSchema = exports.WorkflowAssistantQuestionsResponseSchema;
    exports.SamyWorkflowResponseSchema = exports.WorkflowAssistantWorkflowResponseSchema;
    exports.SamyGenerateWorkflowResponseSchema = exports.WorkflowAssistantGenerateResponseSchema;
    exports.SamyWorkflowDraftResultSchema = zod_1.z.object({
      workflowName: zod_1.z.string().min(1),
      reasoningSummary: zod_1.z.string().min(1),
      portableWorkflow: portableWorkflow_1.PortableWorkflowDocumentSchema
    });
  }
});

// ../packages/workflow-contracts/dist/workflowRun.js
var require_workflowRun = __commonJS({
  "../packages/workflow-contracts/dist/workflowRun.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WorkflowExecutionResultSchema = exports.WorkflowRunResultSchema = exports.WorkflowRunSummarySchema = exports.WorkflowRunProgressEventSchema = exports.WorkflowRunArtifactSchema = void 0;
    var zod_1 = __require("zod");
    exports.WorkflowRunArtifactSchema = zod_1.z.object({
      nodeId: zod_1.z.string().min(1),
      nodeType: zod_1.z.string().min(1),
      label: zod_1.z.string().min(1),
      kind: zod_1.z.enum(["image", "video", "text", "json"]),
      url: zod_1.z.string().min(1).optional(),
      text: zod_1.z.string().min(1).optional(),
      mimeType: zod_1.z.string().min(1).nullable().optional(),
      modelId: zod_1.z.string().min(1).nullable().optional(),
      prompt: zod_1.z.string().min(1).nullable().optional(),
      data: zod_1.z.record(zod_1.z.string(), zod_1.z.unknown()).optional()
    });
    exports.WorkflowRunProgressEventSchema = zod_1.z.object({
      step: zod_1.z.enum(["workflow_start", "node_start", "node_complete", "node_failed", "workflow_complete"]),
      nodeId: zod_1.z.string().min(1),
      nodeType: zod_1.z.string().min(1),
      label: zod_1.z.string().min(1),
      status: zod_1.z.enum(["queued", "running", "success", "failed", "skipped"]),
      message: zod_1.z.string().min(1).nullable().optional(),
      completedNodeCount: zod_1.z.number().int().nonnegative().optional(),
      totalNodeCount: zod_1.z.number().int().nonnegative().optional(),
      timestamp: zod_1.z.string().min(1)
    });
    exports.WorkflowRunSummarySchema = zod_1.z.object({
      executedNodeCount: zod_1.z.number().int().nonnegative(),
      artifactCount: zod_1.z.number().int().nonnegative(),
      warningCount: zod_1.z.number().int().nonnegative()
    });
    exports.WorkflowRunResultSchema = zod_1.z.object({
      runId: zod_1.z.string().min(1),
      workflowName: zod_1.z.string().min(1),
      artifactCount: zod_1.z.number().int().nonnegative(),
      executedNodeCount: zod_1.z.number().int().nonnegative(),
      warnings: zod_1.z.array(zod_1.z.string()),
      artifacts: zod_1.z.array(exports.WorkflowRunArtifactSchema)
    });
    exports.WorkflowExecutionResultSchema = zod_1.z.object({
      run: exports.WorkflowRunResultSchema,
      progressEvents: zod_1.z.array(exports.WorkflowRunProgressEventSchema),
      summary: exports.WorkflowRunSummarySchema,
      creditsUsed: zod_1.z.number().optional(),
      remainingCredits: zod_1.z.number().optional()
    });
  }
});

// ../packages/workflow-contracts/dist/gptImage25.js
var require_gptImage25 = __commonJS({
  "../packages/workflow-contracts/dist/gptImage25.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GPT_IMAGE_25_BASE_COST = exports.gptImage25CreditCost = exports.billedGptImage25Quality = exports.GPT_IMAGE_25_USD = exports.gptImage25SentImageSize = exports.getGptImage25Size = exports.capGptImageSizeToTier = exports.gptImage25TargetPixels = exports.normalizeGptImage25Resolution = exports.normalizeGptImage25Quality = exports.GPT_IMAGE_25_DEFAULT_QUALITY = exports.GPT_IMAGE_25_QUALITIES = void 0;
    exports.GPT_IMAGE_25_QUALITIES = ["low", "medium", "high", "xhigh", "max"];
    exports.GPT_IMAGE_25_DEFAULT_QUALITY = "high";
    var normalizeGptImage25Quality = (value) => {
      const q = String(value ?? "").trim().toLowerCase();
      return exports.GPT_IMAGE_25_QUALITIES.includes(q) ? q : exports.GPT_IMAGE_25_DEFAULT_QUALITY;
    };
    exports.normalizeGptImage25Quality = normalizeGptImage25Quality;
    var normalizeGptImage25Resolution = (value) => {
      const res = String(value ?? "").trim().toUpperCase();
      if (res === "4K")
        return "4K";
      if (res === "2K")
        return "2K";
      return "1K";
    };
    exports.normalizeGptImage25Resolution = normalizeGptImage25Resolution;
    var MIN_TOTAL_PIXELS = 655360;
    var MAX_TOTAL_PIXELS = 8294400;
    var MAX_EDGE = 3840;
    var RATIOS = {
      "1:1": [1, 1],
      "16:9": [16, 9],
      "9:16": [9, 16],
      "4:3": [4, 3],
      "3:4": [3, 4],
      "3:2": [3, 2],
      "2:3": [2, 3],
      "21:9": [21, 9]
    };
    var gptImage25TargetPixels = (resolution) => {
      const res = (0, exports.normalizeGptImage25Resolution)(resolution);
      if (res === "4K")
        return 3840 * 2160;
      if (res === "2K")
        return 2048 * 2048;
      return 1024 * 1024;
    };
    exports.gptImage25TargetPixels = gptImage25TargetPixels;
    var TIER_MAX_PIXELS = { "1K": 1024 * 1024, "2K": 2048 * 2048 };
    var capGptImageSizeToTier = (width, height, resolution) => {
      const max = TIER_MAX_PIXELS[String(resolution || "1K").trim().toUpperCase()];
      if (!max)
        return { width, height };
      const ratio = width / height;
      let w = width;
      let h = height;
      while (w * h > max && w > 16 && h > 16) {
        if (w / h >= ratio)
          w -= 16;
        else
          h -= 16;
      }
      return { width: w, height: h };
    };
    exports.capGptImageSizeToTier = capGptImageSizeToTier;
    var getGptImage25Size = (aspectRatio, resolution) => {
      const ar = String(aspectRatio || "1:1");
      if (ar === "auto")
        return "auto";
      const [wRatio, hRatio] = RATIOS[ar] || RATIOS["1:1"];
      const targetPixels = (0, exports.gptImage25TargetPixels)(resolution);
      const unit = Math.sqrt(targetPixels / (wRatio * hRatio));
      let width = Math.round(unit * wRatio / 16) * 16;
      let height = Math.round(unit * hRatio / 16) * 16;
      if (width > MAX_EDGE) {
        height = Math.round(MAX_EDGE / width * height / 16) * 16;
        width = MAX_EDGE;
      }
      if (height > MAX_EDGE) {
        width = Math.round(MAX_EDGE / height * width / 16) * 16;
        height = MAX_EDGE;
      }
      if (width * height > MAX_TOTAL_PIXELS) {
        const scale = Math.sqrt(MAX_TOTAL_PIXELS / (width * height));
        width = Math.floor(width * scale / 16) * 16;
        height = Math.floor(height * scale / 16) * 16;
      }
      ({ width, height } = (0, exports.capGptImageSizeToTier)(width, height, (0, exports.normalizeGptImage25Resolution)(resolution)));
      if (width * height < MIN_TOTAL_PIXELS)
        return { width: 1024, height: 1024 };
      return { width, height };
    };
    exports.getGptImage25Size = getGptImage25Size;
    var gptImage25SentImageSize = (aspectRatio, resolution) => (0, exports.getGptImage25Size)(aspectRatio && aspectRatio !== "auto" ? aspectRatio : "1:1", resolution || "1K");
    exports.gptImage25SentImageSize = gptImage25SentImageSize;
    exports.GPT_IMAGE_25_USD = {
      "1K": { low: 59e-4, medium: 0.0132, high: 0.0527, xhigh: 0.0937, max: 0.2108 },
      "2K": { low: 67e-4, medium: 0.0157, high: 0.0603, xhigh: 0.1071, max: 0.2409 },
      "4K": { low: 0.0112, medium: 0.026, high: 0.1001, xhigh: 0.1779, max: 0.4003 }
    };
    var billedGptImage25Quality = (value) => String(value ?? "").trim().toLowerCase() === "auto" ? "max" : (0, exports.normalizeGptImage25Quality)(value);
    exports.billedGptImage25Quality = billedGptImage25Quality;
    var ceilCredits = (usd) => Math.ceil(Math.round(usd * 100 * 1e6) / 1e6);
    var gptImage25CreditCost = (inputs) => ceilCredits(exports.GPT_IMAGE_25_USD[(0, exports.normalizeGptImage25Resolution)(inputs.resolution)][(0, exports.billedGptImage25Quality)(inputs.quality)]);
    exports.gptImage25CreditCost = gptImage25CreditCost;
    exports.GPT_IMAGE_25_BASE_COST = (0, exports.gptImage25CreditCost)({ resolution: "1K", quality: exports.GPT_IMAGE_25_DEFAULT_QUALITY });
  }
});

// ../packages/workflow-contracts/dist/falPayloadGuards.js
var require_falPayloadGuards = __commonJS({
  "../packages/workflow-contracts/dist/falPayloadGuards.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.normalizeModelResolution = normalizeModelResolution;
    exports.clampPromptForModel = clampPromptForModel;
    exports.withSentResolution = withSentResolution;
    var GENERIC_TO_VIDEO_TIER = {
      "0.5K": "1080p",
      "1K": "1080p",
      "2K": "1440p",
      "4K": "2160p",
      "4k": "2160p"
    };
    function normalizeModelResolution(resolution, supportedResolutions) {
      const supported = supportedResolutions ?? [];
      if (supported.length === 0)
        return resolution ?? void 0;
      if (!resolution)
        return supported[0];
      if (supported.includes(resolution))
        return resolution;
      const mapped = GENERIC_TO_VIDEO_TIER[resolution];
      if (mapped && supported.includes(mapped))
        return mapped;
      return supported[0];
    }
    function clampPromptForModel(prompt, maxPromptLength) {
      if (!maxPromptLength || maxPromptLength <= 0)
        return prompt;
      if (prompt.length <= maxPromptLength)
        return prompt;
      const hard = prompt.slice(0, maxPromptLength);
      const minBoundary = Math.floor(maxPromptLength * 0.85);
      const lastBoundary = Math.max(hard.lastIndexOf(" "), hard.lastIndexOf("\n"), hard.lastIndexOf(". "), hard.lastIndexOf(", "));
      return (lastBoundary >= minBoundary ? hard.slice(0, lastBoundary) : hard).trim();
    }
    function withSentResolution(inputs, supportedResolutions) {
      const raw = typeof inputs.resolution === "string" && inputs.resolution ? inputs.resolution : null;
      if (!raw)
        return inputs;
      const sent = normalizeModelResolution(raw, supportedResolutions);
      if (sent === void 0 || sent === raw)
        return inputs;
      return { ...inputs, resolution: sent };
    }
  }
});

// ../packages/workflow-contracts/dist/ltx25.js
var require_ltx25 = __commonJS({
  "../packages/workflow-contracts/dist/ltx25.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LTX25_ENDPOINTS = exports.LTX25_GUIDANCE_MAX = exports.LTX25_GUIDANCE_MIN = exports.LTX25_AUDIO_MAX_SECONDS = exports.LTX25_AUDIO_MIN_SECONDS = exports.LTX25_PROMPT_MAX_LENGTH = exports.LTX25_DEFAULT_FPS = exports.LTX25_DEFAULT_RESOLUTION = exports.LTX25_DEFAULT_DURATION = exports.LTX25_MODE_SPECS = exports.LTX25_CAMERA_MOTIONS = void 0;
    exports.normalizeLtx25Resolution = normalizeLtx25Resolution;
    exports.normalizeLtx25Duration = normalizeLtx25Duration;
    exports.normalizeLtx25Fps = normalizeLtx25Fps;
    exports.normalizeLtx25CameraMotion = normalizeLtx25CameraMotion;
    exports.normalizeLtx25AspectRatio = normalizeLtx25AspectRatio;
    exports.ltx25CreditsPerSecond = ltx25CreditsPerSecond;
    exports.ltx25CreditCost = ltx25CreditCost;
    exports.ltx25BillableAudioSeconds = ltx25BillableAudioSeconds;
    exports.ltx25AudioCreditCost = ltx25AudioCreditCost;
    exports.ltx25AudioReservation = ltx25AudioReservation;
    exports.normalizeLtx25GuidanceScale = normalizeLtx25GuidanceScale;
    exports.resolveLtx25AudioUrl = resolveLtx25AudioUrl;
    exports.resolveLtx25Kind = resolveLtx25Kind;
    exports.buildLtx25FalRequest = buildLtx25FalRequest;
    var falPayloadGuards_1 = require_falPayloadGuards();
    exports.LTX25_CAMERA_MOTIONS = [
      "dolly_in",
      "dolly_out",
      "dolly_left",
      "dolly_right",
      "jib_up",
      "jib_down",
      "static",
      "focus_shift"
    ];
    exports.LTX25_MODE_SPECS = {
      fast: {
        durations: [6, 8, 10, 12, 14, 16, 18, 20],
        resolutions: ["720p", "1080p", "1440p", "2160p"],
        fps: [24, 25, 48, 50]
      },
      pro: {
        durations: [6, 8, 10],
        resolutions: ["720p", "1080p"],
        fps: [24, 25, 50]
      }
    };
    exports.LTX25_DEFAULT_DURATION = 6;
    exports.LTX25_DEFAULT_RESOLUTION = "1080p";
    exports.LTX25_DEFAULT_FPS = 25;
    exports.LTX25_PROMPT_MAX_LENGTH = 5e3;
    exports.LTX25_AUDIO_MIN_SECONDS = 2;
    exports.LTX25_AUDIO_MAX_SECONDS = 20;
    exports.LTX25_GUIDANCE_MIN = 1;
    exports.LTX25_GUIDANCE_MAX = 50;
    exports.LTX25_ENDPOINTS = {
      fast: {
        t2v: "lightricks/ltx-2.5/text-to-video/fast",
        i2v: "lightricks/ltx-2.5/image-to-video/fast",
        a2v: "lightricks/ltx-2.5/audio-to-video/fast"
      },
      pro: {
        t2v: "lightricks/ltx-2.5/text-to-video/pro",
        i2v: "lightricks/ltx-2.5/image-to-video/pro",
        a2v: "lightricks/ltx-2.5/audio-to-video/pro"
      }
    };
    var CREDITS_PER_SECOND = {
      fast: { "720p": 9, "1080p": 13, "1440p": 19, "2160p": 30 },
      pro: { "720p": 12, "1080p": 17 }
    };
    var RESOLUTION_RANK = {
      "720p": 1,
      "1080p": 2,
      "1440p": 3,
      "2160p": 4
    };
    var GENERIC_TO_TIER = {
      "0.5K": "720p",
      "1K": "1080p",
      "2K": "1440p",
      "4K": "2160p"
    };
    var firstUrl = (value) => {
      if (typeof value === "string" && value.trim())
        return value.trim();
      if (Array.isArray(value)) {
        for (const entry of value) {
          const found = firstUrl(entry);
          if (found)
            return found;
        }
      }
      return void 0;
    };
    var clampDownToAllowed = (value, allowed) => {
      let best;
      for (const candidate of allowed) {
        if (candidate <= value && (best === void 0 || candidate > best))
          best = candidate;
      }
      return best ?? Math.min(...allowed);
    };
    function normalizeLtx25Resolution(resolution, mode) {
      const supported = exports.LTX25_MODE_SPECS[mode].resolutions;
      const raw = (resolution ?? "").toString().trim();
      let candidate = exports.LTX25_DEFAULT_RESOLUTION;
      if (raw) {
        if (RESOLUTION_RANK[raw] !== void 0) {
          candidate = raw;
        } else {
          const generic = GENERIC_TO_TIER[raw] ?? GENERIC_TO_TIER[raw.toUpperCase()];
          if (generic)
            candidate = generic;
        }
      }
      if (supported.includes(candidate))
        return candidate;
      const wanted = RESOLUTION_RANK[candidate] ?? RESOLUTION_RANK[exports.LTX25_DEFAULT_RESOLUTION];
      let best;
      for (const tier of supported) {
        const rank = RESOLUTION_RANK[tier] ?? 0;
        if (rank <= wanted && (best === void 0 || rank > (RESOLUTION_RANK[best] ?? 0))) {
          best = tier;
        }
      }
      return best ?? supported[0];
    }
    function normalizeLtx25Duration(duration, mode) {
      const parsed = Number(duration);
      if (!Number.isFinite(parsed) || parsed <= 0)
        return exports.LTX25_DEFAULT_DURATION;
      return clampDownToAllowed(Math.trunc(parsed), exports.LTX25_MODE_SPECS[mode].durations);
    }
    function normalizeLtx25Fps(fps, mode) {
      const parsed = Number(fps);
      if (!Number.isFinite(parsed) || parsed <= 0)
        return exports.LTX25_DEFAULT_FPS;
      return clampDownToAllowed(Math.trunc(parsed), exports.LTX25_MODE_SPECS[mode].fps);
    }
    function normalizeLtx25CameraMotion(value) {
      return typeof value === "string" && exports.LTX25_CAMERA_MOTIONS.includes(value) ? value : void 0;
    }
    function normalizeLtx25AspectRatio(aspectRatio, kind) {
      const raw = (aspectRatio ?? "").toString().trim();
      if (raw === "16:9" || raw === "9:16")
        return raw;
      if (raw === "auto" && kind !== "t2v")
        return "auto";
      return void 0;
    }
    function ltx25CreditsPerSecond(mode, resolution) {
      const tier = normalizeLtx25Resolution(resolution, mode);
      return CREDITS_PER_SECOND[mode][tier] ?? CREDITS_PER_SECOND[mode][exports.LTX25_DEFAULT_RESOLUTION];
    }
    function ltx25CreditCost(params) {
      const { mode, resolution, duration } = params;
      return ltx25CreditsPerSecond(mode, resolution) * normalizeLtx25Duration(duration, mode);
    }
    function ltx25BillableAudioSeconds(seconds) {
      const parsed = Number(seconds);
      if (!Number.isFinite(parsed) || parsed <= 0)
        return exports.LTX25_AUDIO_MAX_SECONDS;
      return Math.min(exports.LTX25_AUDIO_MAX_SECONDS, Math.max(exports.LTX25_AUDIO_MIN_SECONDS, Math.ceil(parsed)));
    }
    function ltx25AudioCreditCost(params) {
      return ltx25CreditsPerSecond(params.mode, exports.LTX25_DEFAULT_RESOLUTION) * ltx25BillableAudioSeconds(params.seconds);
    }
    function ltx25AudioReservation(mode) {
      return ltx25AudioCreditCost({ mode, seconds: exports.LTX25_AUDIO_MAX_SECONDS });
    }
    function normalizeLtx25GuidanceScale(value) {
      const parsed = Number(value);
      if (!Number.isFinite(parsed))
        return void 0;
      return Math.min(exports.LTX25_GUIDANCE_MAX, Math.max(exports.LTX25_GUIDANCE_MIN, parsed));
    }
    function resolveLtx25AudioUrl(dynamicInputs = {}) {
      return firstUrl(dynamicInputs.audio_url ?? dynamicInputs.audio ?? dynamicInputs.audio_urls);
    }
    function resolveLtx25Media(params) {
      const { imageUrls = [], dynamicInputs = {} } = params;
      const positional = imageUrls.map((url) => typeof url === "string" ? url.trim() : "").filter((url) => url.length > 0);
      const startImage = positional[0] ?? firstUrl(dynamicInputs.start_image ?? dynamicInputs.start_image_url ?? dynamicInputs.image_url);
      if (!startImage)
        return {};
      const endImage = positional.find((url) => url !== startImage) ?? firstUrl(dynamicInputs.end_image ?? dynamicInputs.end_image_url);
      return { startImage, endImage: endImage === startImage ? void 0 : endImage };
    }
    function resolveLtx25Kind(params) {
      if (resolveLtx25AudioUrl(params.dynamicInputs))
        return "a2v";
      return resolveLtx25Media(params).startImage ? "i2v" : "t2v";
    }
    function buildLtx25FalRequest(params) {
      const { mode, prompt, imageUrls = [], resolution, aspectRatio, dynamicInputs = {} } = params;
      const { startImage, endImage } = resolveLtx25Media({ imageUrls, dynamicInputs });
      const audioUrl = resolveLtx25AudioUrl(dynamicInputs);
      if (audioUrl) {
        const clampedPrompt = (0, falPayloadGuards_1.clampPromptForModel)(prompt ?? "", exports.LTX25_PROMPT_MAX_LENGTH);
        const guidance = normalizeLtx25GuidanceScale(dynamicInputs.guidance_scale);
        const audioRatio = normalizeLtx25AspectRatio(aspectRatio ?? dynamicInputs.aspect_ratio, "a2v");
        return {
          falModelId: exports.LTX25_ENDPOINTS[mode].a2v,
          kind: "a2v",
          input: {
            audio_url: audioUrl,
            ...startImage ? { image_url: startImage } : {},
            ...clampedPrompt ? { prompt: clampedPrompt } : {},
            ...guidance !== void 0 ? { guidance_scale: guidance } : {},
            ...audioRatio ? { aspect_ratio: audioRatio } : {}
          }
        };
      }
      const kind = startImage ? "i2v" : "t2v";
      const ratio = normalizeLtx25AspectRatio(aspectRatio ?? dynamicInputs.aspect_ratio, kind);
      const cameraMotion = normalizeLtx25CameraMotion(dynamicInputs.camera_motion);
      const generateAudio = dynamicInputs.generate_audio;
      const input = {
        prompt: (0, falPayloadGuards_1.clampPromptForModel)(prompt ?? "", exports.LTX25_PROMPT_MAX_LENGTH),
        duration: normalizeLtx25Duration(dynamicInputs.duration, mode),
        resolution: normalizeLtx25Resolution(resolution ?? dynamicInputs.resolution, mode),
        fps: normalizeLtx25Fps(dynamicInputs.fps, mode),
        ...startImage ? { image_url: startImage } : {},
        ...endImage ? { end_image_url: endImage } : {},
        ...ratio ? { aspect_ratio: ratio } : {},
        ...cameraMotion ? { camera_motion: cameraMotion } : {},
        ...typeof generateAudio === "boolean" ? { generate_audio: generateAudio } : {}
      };
      return { falModelId: exports.LTX25_ENDPOINTS[mode][kind], input, kind };
    }
  }
});

// ../packages/workflow-contracts/dist/minimaxH3.js
var require_minimaxH3 = __commonJS({
  "../packages/workflow-contracts/dist/minimaxH3.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.H3_MAX_REF_FILES = exports.H3_MAX_REF_AUDIOS = exports.H3_MAX_REF_VIDEOS = exports.H3_MAX_REF_IMAGES = exports.H3_REF_IMAGE_EXTRA_CREDITS = exports.H3_REF_IMAGE_FREE = exports.H3_DEFAULT_DURATION = exports.H3_DEFAULT_RESOLUTION = exports.H3_ENDPOINTS = exports.H3_R2V_ASPECTS = exports.H3_T2V_ASPECTS = exports.H3_DURATIONS = exports.H3_RESOLUTIONS = void 0;
    exports.normalizeH3Resolution = normalizeH3Resolution;
    exports.normalizeH3Duration = normalizeH3Duration;
    exports.normalizeH3AspectRatio = normalizeH3AspectRatio;
    exports.countH3ReferenceImages = countH3ReferenceImages;
    exports.h3CreditCost = h3CreditCost;
    exports.buildH3FalRequest = buildH3FalRequest;
    exports.H3_RESOLUTIONS = ["480P", "768P", "2K", "4K"];
    exports.H3_DURATIONS = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    exports.H3_T2V_ASPECTS = ["21:9", "16:9", "4:3", "1:1", "3:4", "9:16"];
    exports.H3_R2V_ASPECTS = ["adaptive", "21:9", "16:9", "4:3", "1:1", "3:4", "9:16"];
    exports.H3_ENDPOINTS = {
      t2v: "minimax/h3/text-to-video",
      i2v: "minimax/h3/image-to-video",
      r2v: "minimax/h3/reference-to-video"
    };
    exports.H3_DEFAULT_RESOLUTION = "2K";
    exports.H3_DEFAULT_DURATION = 5;
    exports.H3_REF_IMAGE_FREE = 5;
    exports.H3_REF_IMAGE_EXTRA_CREDITS = 8;
    exports.H3_MAX_REF_IMAGES = 9;
    exports.H3_MAX_REF_VIDEOS = 3;
    exports.H3_MAX_REF_AUDIOS = 3;
    exports.H3_MAX_REF_FILES = 12;
    var USD_PER_SECOND = {
      "480P": 0.05,
      "768P": 0.06,
      "2K": 0.13,
      "4K": 0.16
    };
    var RESOLUTION_ALIASES = {
      "480p": "480P",
      "480P": "480P",
      "768p": "768P",
      "768P": "768P",
      "2k": "2K",
      "2K": "2K",
      "4k": "4K",
      "4K": "4K",
      "720p": "768P",
      "1080p": "2K",
      "1440p": "2K",
      "2160p": "4K"
    };
    var T2V_ASPECT_SET = new Set(exports.H3_T2V_ASPECTS);
    var R2V_ASPECT_SET = new Set(exports.H3_R2V_ASPECTS);
    var toUrlArray = (value, limit) => {
      if (!value)
        return [];
      const collected = [];
      const push = (v) => {
        if (typeof v === "string" && v.trim())
          collected.push(v.trim());
        else if (Array.isArray(v))
          v.forEach(push);
      };
      push(value);
      return Array.from(new Set(collected)).slice(0, limit);
    };
    var firstUrl = (value) => toUrlArray(value, 1)[0];
    function normalizeH3Resolution(raw) {
      if (raw === void 0 || raw === null || raw === "")
        return exports.H3_DEFAULT_RESOLUTION;
      const key = String(raw).trim();
      if (RESOLUTION_ALIASES[key])
        return RESOLUTION_ALIASES[key];
      const lower = key.toLowerCase();
      if (RESOLUTION_ALIASES[lower])
        return RESOLUTION_ALIASES[lower];
      return exports.H3_DEFAULT_RESOLUTION;
    }
    function normalizeH3Duration(raw) {
      if (raw === void 0 || raw === null || raw === "" || raw === "auto") {
        return exports.H3_DEFAULT_DURATION;
      }
      const parsed = Number(raw);
      if (!Number.isFinite(parsed) || parsed <= 0)
        return exports.H3_DEFAULT_DURATION;
      return Math.min(15, Math.max(5, Math.trunc(parsed)));
    }
    function normalizeH3AspectRatio(aspectRatio, kind) {
      if (kind === "i2v")
        return void 0;
      const raw = (aspectRatio ?? "").toString().trim();
      if (kind === "t2v")
        return T2V_ASPECT_SET.has(raw) ? raw : void 0;
      if (raw === "auto")
        return "adaptive";
      return R2V_ASPECT_SET.has(raw) ? raw : void 0;
    }
    function countH3ReferenceImages(inputs = {}) {
      const fromMedia = collectR2vMedia({
        imageUrls: toUrlArray(inputs.imageUrls ?? inputs.image_urls, exports.H3_MAX_REF_IMAGES),
        dynamicInputs: inputs
      }).images.length;
      if (fromMedia > 0)
        return fromMedia;
      const n = Number(inputs.imageInputCount);
      return Number.isFinite(n) && n > 0 ? Math.min(exports.H3_MAX_REF_IMAGES, Math.trunc(n)) : 0;
    }
    var creditsPerSecond = (resolution) => Math.round(USD_PER_SECOND[resolution] * 100);
    function h3CreditCost(params) {
      const resolution = normalizeH3Resolution(params.resolution);
      const duration = normalizeH3Duration(params.duration);
      const extras = Math.max(0, (params.referenceImageCount ?? 0) - exports.H3_REF_IMAGE_FREE);
      return creditsPerSecond(resolution) * duration + extras * exports.H3_REF_IMAGE_EXTRA_CREDITS;
    }
    function resolveI2vFrames(params) {
      const { imageUrls = [], dynamicInputs = {} } = params;
      const positional = imageUrls.map((url) => typeof url === "string" ? url.trim() : "").filter((url) => url.length > 0);
      const namedStart = firstUrl(dynamicInputs.start_image ?? dynamicInputs.start_image_url ?? dynamicInputs.image_url);
      const namedEnd = firstUrl(dynamicInputs.end_image ?? dynamicInputs.end_image_url);
      const start = namedStart ?? positional[0];
      if (!start)
        return {};
      const end = namedEnd ?? positional.find((url) => url !== start);
      return { start, end: end === start ? void 0 : end };
    }
    function collectR2vMedia(params) {
      const { imageUrls = [], dynamicInputs = {} } = params;
      const images = toUrlArray([
        ...imageUrls,
        dynamicInputs.reference_image_urls,
        dynamicInputs.reference_images,
        dynamicInputs.reference_image,
        dynamicInputs.reference_image_url,
        dynamicInputs.images,
        dynamicInputs.image
      ], exports.H3_MAX_REF_IMAGES);
      const videos = toUrlArray([
        dynamicInputs.reference_video_urls,
        dynamicInputs.reference_videos,
        dynamicInputs.reference_video,
        dynamicInputs.reference_video_url,
        dynamicInputs.video_urls,
        dynamicInputs.video_url,
        dynamicInputs.video
      ], exports.H3_MAX_REF_VIDEOS);
      const audios = toUrlArray([
        dynamicInputs.reference_audio_urls,
        dynamicInputs.reference_audios,
        dynamicInputs.reference_audio,
        dynamicInputs.reference_audio_url,
        dynamicInputs.audio_urls,
        dynamicInputs.audio_url,
        dynamicInputs.audio
      ], exports.H3_MAX_REF_AUDIOS);
      const keptImages = images.slice();
      const keptVideos = videos.slice();
      const keptAudios = audios.slice();
      while (keptImages.length + keptVideos.length + keptAudios.length > exports.H3_MAX_REF_FILES) {
        if (keptAudios.length > 0)
          keptAudios.pop();
        else if (keptVideos.length > 0)
          keptVideos.pop();
        else
          keptImages.pop();
      }
      return { images: keptImages, videos: keptVideos, audios: keptAudios };
    }
    function optionalSeed(dynamicInputs) {
      const raw = dynamicInputs.seed;
      if (raw === void 0 || raw === null || raw === "")
        return void 0;
      const seed = Number(raw);
      return Number.isFinite(seed) ? seed : void 0;
    }
    function optionalExpansion(dynamicInputs) {
      const raw = dynamicInputs.prompt_expansion_mode;
      if (raw === "disabled" || raw === "fast" || raw === "balanced" || raw === "quality")
        return raw;
      return void 0;
    }
    function buildH3FalRequest(params) {
      const { kind, prompt, imageUrls, resolution, aspectRatio, dynamicInputs = {} } = params;
      const common = {
        prompt,
        duration: normalizeH3Duration(dynamicInputs.duration),
        resolution: normalizeH3Resolution(resolution ?? dynamicInputs.resolution)
      };
      const seed = optionalSeed(dynamicInputs);
      if (seed !== void 0)
        common.seed = seed;
      const expansion = optionalExpansion(dynamicInputs);
      if (expansion)
        common.prompt_expansion_mode = expansion;
      if (typeof dynamicInputs.enable_safety_checker === "boolean") {
        common.enable_safety_checker = dynamicInputs.enable_safety_checker;
      }
      if (kind === "t2v") {
        const ar2 = normalizeH3AspectRatio(aspectRatio ?? dynamicInputs.aspect_ratio, "t2v");
        return {
          falModelId: exports.H3_ENDPOINTS.t2v,
          input: { ...common, ...ar2 ? { aspect_ratio: ar2 } : {} }
        };
      }
      if (kind === "i2v") {
        const { start, end } = resolveI2vFrames({ imageUrls, dynamicInputs });
        return {
          falModelId: exports.H3_ENDPOINTS.i2v,
          input: {
            ...common,
            ...start ? { image_url: start } : {},
            ...end ? { end_image_url: end } : {}
          }
        };
      }
      const { images, videos, audios } = collectR2vMedia({ imageUrls, dynamicInputs });
      if (audios.length > 0 && images.length === 0 && videos.length === 0) {
        throw new Error("MiniMax H3 : un audio de r\xE9f\xE9rence n\xE9cessite au moins une image ou vid\xE9o de r\xE9f\xE9rence.");
      }
      const ar = normalizeH3AspectRatio(aspectRatio ?? dynamicInputs.aspect_ratio, "r2v");
      return {
        falModelId: exports.H3_ENDPOINTS.r2v,
        input: {
          ...common,
          ...ar ? { aspect_ratio: ar } : {},
          ...images.length > 0 ? { reference_image_urls: images } : {},
          ...videos.length > 0 ? { reference_video_urls: videos } : {},
          ...audios.length > 0 ? { reference_audio_urls: audios } : {}
        }
      };
    }
  }
});

// ../packages/workflow-contracts/dist/minimaxH3Max.js
var require_minimaxH3Max = __commonJS({
  "../packages/workflow-contracts/dist/minimaxH3Max.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.H3MAX_1080P_CREDITS_PER_SECOND = exports.H3MAX_TOKENS_PER_AUDIO_BOUND = exports.H3MAX_UNMEASURED_REF_VIDEO_SECONDS = exports.H3MAX_TOKENS_PER_VIDEO_SECOND = exports.H3MAX_R2V_REFERENCE_ALIAS_KEYS = exports.H3MAX_CREDITS_PER_SECOND = exports.H3MAX_MAX_REF_FILES = exports.H3MAX_MAX_REF_AUDIOS = exports.H3MAX_MAX_REF_VIDEOS = exports.H3MAX_MAX_REF_IMAGES = exports.H3MAX_CREDITS_PER_1K_EXTRA = exports.H3MAX_TOKENS_PER_AUDIO = exports.H3MAX_TOKENS_PER_VIDEO = exports.H3MAX_TOKENS_PER_IMAGE = exports.H3MAX_REF_FREE_TOKENS = exports.H3MAX_DEFAULT_DURATION = exports.H3MAX_DEFAULT_RESOLUTION = exports.H3MAX_ENDPOINTS = exports.H3MAX_R2V_ASPECTS = exports.H3MAX_T2V_ASPECTS = exports.H3MAX_DURATIONS = exports.H3MAX_RESOLUTIONS = void 0;
    exports.normalizeH3MaxResolution = normalizeH3MaxResolution;
    exports.normalizeH3MaxDuration = normalizeH3MaxDuration;
    exports.normalizeH3MaxAspectRatio = normalizeH3MaxAspectRatio;
    exports.resolveH3MaxReferenceMedia = resolveH3MaxReferenceMedia;
    exports.countH3MaxReferenceMedia = countH3MaxReferenceMedia;
    exports.countH3MaxReferenceImages = countH3MaxReferenceImages;
    exports.h3MaxCreditCost = h3MaxCreditCost;
    exports.buildH3MaxFalRequest = buildH3MaxFalRequest;
    exports.H3MAX_RESOLUTIONS = ["768P", "480P", "1080P"];
    exports.H3MAX_DURATIONS = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    exports.H3MAX_T2V_ASPECTS = ["21:9", "16:9", "4:3", "1:1", "3:4", "9:16"];
    exports.H3MAX_R2V_ASPECTS = ["adaptive", "21:9", "16:9", "4:3", "1:1", "3:4", "9:16"];
    exports.H3MAX_ENDPOINTS = {
      t2v: "minimax/h3-max/text-to-video",
      i2v: "minimax/h3-max/image-to-video",
      r2v: "minimax/h3-max/reference-to-video"
    };
    exports.H3MAX_DEFAULT_RESOLUTION = "768P";
    exports.H3MAX_DEFAULT_DURATION = 5;
    exports.H3MAX_REF_FREE_TOKENS = 4096;
    exports.H3MAX_TOKENS_PER_IMAGE = 4e3;
    exports.H3MAX_TOKENS_PER_VIDEO = 4e3;
    exports.H3MAX_TOKENS_PER_AUDIO = 1e3;
    exports.H3MAX_CREDITS_PER_1K_EXTRA = 2;
    exports.H3MAX_MAX_REF_IMAGES = 9;
    exports.H3MAX_MAX_REF_VIDEOS = 3;
    exports.H3MAX_MAX_REF_AUDIOS = 3;
    exports.H3MAX_MAX_REF_FILES = 12;
    exports.H3MAX_CREDITS_PER_SECOND = {
      "480P": 5,
      "768P": 8,
      "1080P": 16
    };
    var r2vCreditsPerSecond = (resolution) => resolution === "1080P" ? 16 : 8;
    var RESOLUTION_ALIASES = {
      "480p": "480P",
      "480P": "480P",
      "768p": "768P",
      "768P": "768P",
      "720p": "768P",
      // 1080P est un palier FAL depuis 2026-10 : même valeur pour le prix ET la
      // requête (même normaliseur). Les tailles génériques 2K / 4K / 1440p
      // restent rabattues sur le défaut — jamais vers le palier cher.
      "1080p": "1080P",
      "1080P": "1080P",
      "1440p": "768P",
      "2160p": "768P",
      "2k": "768P",
      "2K": "768P",
      "4k": "768P",
      "4K": "768P"
    };
    var T2V_ASPECT_SET = new Set(exports.H3MAX_T2V_ASPECTS);
    var R2V_ASPECT_SET = new Set(exports.H3MAX_R2V_ASPECTS);
    var toUrlArray = (value, limit) => {
      if (!value)
        return [];
      const collected = [];
      const push = (v) => {
        if (typeof v === "string" && v.trim())
          collected.push(v.trim());
        else if (Array.isArray(v))
          v.forEach(push);
      };
      push(value);
      return Array.from(new Set(collected)).slice(0, limit);
    };
    var firstUrl = (value) => toUrlArray(value, 1)[0];
    function normalizeH3MaxResolution(raw) {
      if (raw === void 0 || raw === null || raw === "")
        return exports.H3MAX_DEFAULT_RESOLUTION;
      const key = String(raw).trim();
      if (RESOLUTION_ALIASES[key])
        return RESOLUTION_ALIASES[key];
      const lower = key.toLowerCase();
      if (RESOLUTION_ALIASES[lower])
        return RESOLUTION_ALIASES[lower];
      return exports.H3MAX_DEFAULT_RESOLUTION;
    }
    function normalizeH3MaxDuration(raw) {
      if (raw === void 0 || raw === null || raw === "" || raw === "auto") {
        return exports.H3MAX_DEFAULT_DURATION;
      }
      const parsed = Number(raw);
      if (!Number.isFinite(parsed) || parsed <= 0)
        return exports.H3MAX_DEFAULT_DURATION;
      return Math.min(15, Math.max(5, Math.trunc(parsed)));
    }
    function normalizeH3MaxAspectRatio(aspectRatio, kind) {
      if (kind === "i2v")
        return void 0;
      const raw = (aspectRatio ?? "").toString().trim();
      if (kind === "t2v")
        return T2V_ASPECT_SET.has(raw) ? raw : void 0;
      if (raw === "auto")
        return "adaptive";
      return R2V_ASPECT_SET.has(raw) ? raw : void 0;
    }
    function resolveH3MaxReferenceMedia(inputs = {}) {
      return collectR2vMedia({
        imageUrls: toUrlArray(inputs.imageUrls ?? inputs.image_urls, exports.H3MAX_MAX_REF_IMAGES),
        dynamicInputs: inputs
      });
    }
    exports.H3MAX_R2V_REFERENCE_ALIAS_KEYS = [
      "imageUrls",
      "image_urls",
      "reference_images",
      "reference_image",
      "reference_image_url",
      "images",
      "image",
      "reference_videos",
      "reference_video",
      "reference_video_url",
      "video_urls",
      "video_url",
      "video",
      "reference_audios",
      "reference_audio",
      "reference_audio_url",
      "audio_urls",
      "audio_url",
      "audio"
    ];
    function countH3MaxReferenceMedia(inputs = {}) {
      const media = resolveH3MaxReferenceMedia(inputs);
      if (media.images.length + media.videos.length + media.audios.length > 0) {
        return { images: media.images.length, videos: media.videos.length, audios: media.audios.length };
      }
      const n = Number(inputs.imageInputCount);
      const images = Number.isFinite(n) && n > 0 ? Math.min(exports.H3MAX_MAX_REF_IMAGES, Math.trunc(n)) : 0;
      return { images, videos: 0, audios: 0 };
    }
    function countH3MaxReferenceImages(inputs = {}) {
      return countH3MaxReferenceMedia(inputs).images;
    }
    exports.H3MAX_TOKENS_PER_VIDEO_SECOND = 6855;
    exports.H3MAX_UNMEASURED_REF_VIDEO_SECONDS = 15;
    exports.H3MAX_TOKENS_PER_AUDIO_BOUND = 1200;
    exports.H3MAX_1080P_CREDITS_PER_SECOND = exports.H3MAX_CREDITS_PER_SECOND["1080P"];
    function extraRefCredits(params) {
      const videos = Math.max(0, params.referenceVideoCount ?? 0);
      const videoSeconds = typeof params.referenceVideoSeconds === "number" && Number.isFinite(params.referenceVideoSeconds) ? Math.max(0, params.referenceVideoSeconds) : videos * exports.H3MAX_UNMEASURED_REF_VIDEO_SECONDS;
      const videoTokens = videos > 0 ? Math.max(videos * exports.H3MAX_TOKENS_PER_VIDEO, Math.ceil(videoSeconds * exports.H3MAX_TOKENS_PER_VIDEO_SECOND)) : 0;
      const tokens = Math.max(0, params.referenceImageCount ?? 0) * exports.H3MAX_TOKENS_PER_IMAGE + videoTokens + Math.max(0, params.referenceAudioCount ?? 0) * Math.max(exports.H3MAX_TOKENS_PER_AUDIO, exports.H3MAX_TOKENS_PER_AUDIO_BOUND);
      const extra = Math.max(0, tokens - exports.H3MAX_REF_FREE_TOKENS);
      if (extra === 0)
        return 0;
      return Math.ceil(extra / 1e3) * exports.H3MAX_CREDITS_PER_1K_EXTRA;
    }
    function h3MaxCreditCost(params) {
      const duration = normalizeH3MaxDuration(params.duration);
      const resolution = params.sentResolution === "1080P" ? "1080P" : normalizeH3MaxResolution(params.resolution);
      const perSec = params.kind === "r2v" ? r2vCreditsPerSecond(resolution) : exports.H3MAX_CREDITS_PER_SECOND[resolution];
      return perSec * duration + extraRefCredits(params);
    }
    function resolveI2vFrames(params) {
      const { imageUrls = [], dynamicInputs = {} } = params;
      const positional = imageUrls.map((url) => typeof url === "string" ? url.trim() : "").filter((url) => url.length > 0);
      const namedStart = firstUrl(dynamicInputs.start_image ?? dynamicInputs.start_image_url ?? dynamicInputs.image_url);
      const namedEnd = firstUrl(dynamicInputs.end_image ?? dynamicInputs.end_image_url);
      const start = namedStart ?? positional[0];
      if (!start)
        return {};
      const end = namedEnd ?? positional.find((url) => url !== start);
      return { start, end: end === start ? void 0 : end };
    }
    function collectR2vMedia(params) {
      const { imageUrls = [], dynamicInputs = {} } = params;
      const images = toUrlArray([
        ...imageUrls,
        dynamicInputs.reference_image_urls,
        dynamicInputs.reference_images,
        dynamicInputs.reference_image,
        dynamicInputs.reference_image_url,
        dynamicInputs.images,
        dynamicInputs.image
      ], exports.H3MAX_MAX_REF_IMAGES);
      const videos = toUrlArray([
        dynamicInputs.reference_video_urls,
        dynamicInputs.reference_videos,
        dynamicInputs.reference_video,
        dynamicInputs.reference_video_url,
        dynamicInputs.video_urls,
        dynamicInputs.video_url,
        dynamicInputs.video
      ], exports.H3MAX_MAX_REF_VIDEOS);
      const audios = toUrlArray([
        dynamicInputs.reference_audio_urls,
        dynamicInputs.reference_audios,
        dynamicInputs.reference_audio,
        dynamicInputs.reference_audio_url,
        dynamicInputs.audio_urls,
        dynamicInputs.audio_url,
        dynamicInputs.audio
      ], exports.H3MAX_MAX_REF_AUDIOS);
      const keptImages = images.slice();
      const keptVideos = videos.slice();
      const keptAudios = audios.slice();
      while (keptImages.length + keptVideos.length + keptAudios.length > exports.H3MAX_MAX_REF_FILES) {
        if (keptAudios.length > 0)
          keptAudios.pop();
        else if (keptVideos.length > 0)
          keptVideos.pop();
        else
          keptImages.pop();
      }
      return { images: keptImages, videos: keptVideos, audios: keptAudios };
    }
    function optionalSeed(dynamicInputs) {
      const raw = dynamicInputs.seed;
      if (raw === void 0 || raw === null || raw === "")
        return void 0;
      const seed = Number(raw);
      return Number.isFinite(seed) ? seed : void 0;
    }
    function expansionMode(dynamicInputs) {
      return dynamicInputs.prompt_expansion_mode === "quality" ? "quality" : "balanced";
    }
    function buildH3MaxFalRequest(params) {
      const { kind, prompt, imageUrls, resolution, aspectRatio, dynamicInputs = {} } = params;
      const common = {
        prompt,
        duration: normalizeH3MaxDuration(dynamicInputs.duration),
        resolution: normalizeH3MaxResolution(resolution ?? dynamicInputs.resolution),
        prompt_expansion_mode: expansionMode(dynamicInputs)
      };
      const seed = optionalSeed(dynamicInputs);
      if (seed !== void 0)
        common.seed = seed;
      if (typeof dynamicInputs.enable_safety_checker === "boolean") {
        common.enable_safety_checker = dynamicInputs.enable_safety_checker;
      }
      if (kind === "t2v") {
        const ar2 = normalizeH3MaxAspectRatio(aspectRatio ?? dynamicInputs.aspect_ratio, "t2v");
        return {
          falModelId: exports.H3MAX_ENDPOINTS.t2v,
          input: { ...common, ...ar2 ? { aspect_ratio: ar2 } : {} }
        };
      }
      if (kind === "i2v") {
        const { start, end } = resolveI2vFrames({ imageUrls, dynamicInputs });
        return {
          falModelId: exports.H3MAX_ENDPOINTS.i2v,
          input: {
            ...common,
            ...start ? { image_url: start } : {},
            ...end ? { end_image_url: end } : {}
          }
        };
      }
      const { images, videos, audios } = collectR2vMedia({ imageUrls, dynamicInputs });
      if (audios.length > 0 && images.length === 0 && videos.length === 0) {
        throw new Error("MiniMax H3 Max : un audio de r\xE9f\xE9rence n\xE9cessite au moins une image ou vid\xE9o de r\xE9f\xE9rence.");
      }
      const ar = normalizeH3MaxAspectRatio(aspectRatio ?? dynamicInputs.aspect_ratio, "r2v");
      return {
        falModelId: exports.H3MAX_ENDPOINTS.r2v,
        input: {
          ...common,
          ...ar ? { aspect_ratio: ar } : {},
          ...images.length > 0 ? { reference_image_urls: images } : {},
          ...videos.length > 0 ? { reference_video_urls: videos } : {},
          ...audios.length > 0 ? { reference_audio_urls: audios } : {}
        }
      };
    }
  }
});

// ../packages/workflow-contracts/dist/geminiOmniFlash.js
var require_geminiOmniFlash = __commonJS({
  "../packages/workflow-contracts/dist/geminiOmniFlash.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GEMINI_OMNI_FLASH_CREDITS_PER_SECOND = exports.GEMINI_OMNI_FLASH_MAX_REF_VIDEOS = exports.GEMINI_OMNI_FLASH_MAX_REF_IMAGES = exports.GEMINI_OMNI_FLASH_EDIT_SECONDS = exports.GEMINI_OMNI_FLASH_DEFAULT_DURATION = exports.GEMINI_OMNI_FLASH_DEFAULT_RESOLUTION = exports.GEMINI_OMNI_FLASH_ENDPOINTS = exports.GEMINI_OMNI_FLASH_ASPECTS = exports.GEMINI_OMNI_FLASH_DURATIONS = exports.GEMINI_OMNI_FLASH_RESOLUTIONS = void 0;
    exports.normalizeGeminiOmniFlashResolution = normalizeGeminiOmniFlashResolution;
    exports.normalizeGeminiOmniFlashDuration = normalizeGeminiOmniFlashDuration;
    exports.normalizeGeminiOmniFlashAspectRatio = normalizeGeminiOmniFlashAspectRatio;
    exports.hasGeminiOmniFlashEditVideo = hasGeminiOmniFlashEditVideo;
    exports.geminiOmniFlashCreditCost = geminiOmniFlashCreditCost;
    exports.buildGeminiOmniFlashFalRequest = buildGeminiOmniFlashFalRequest;
    exports.GEMINI_OMNI_FLASH_RESOLUTIONS = [
      "360p",
      "720p",
      "1080p",
      "4k"
    ];
    exports.GEMINI_OMNI_FLASH_DURATIONS = [3, 4, 5, 6, 7, 8, 9, 10];
    exports.GEMINI_OMNI_FLASH_ASPECTS = ["16:9", "9:16"];
    exports.GEMINI_OMNI_FLASH_ENDPOINTS = {
      t2v: "google/gemini-omni-flash/v1.1/text-to-video",
      i2v: "google/gemini-omni-flash/v1.1/image-to-video",
      r2v: "google/gemini-omni-flash/v1.1/reference-to-video",
      edit: "google/gemini-omni-flash/v1.1/edit"
    };
    exports.GEMINI_OMNI_FLASH_DEFAULT_RESOLUTION = "720p";
    exports.GEMINI_OMNI_FLASH_DEFAULT_DURATION = 8;
    exports.GEMINI_OMNI_FLASH_EDIT_SECONDS = 10;
    exports.GEMINI_OMNI_FLASH_MAX_REF_IMAGES = 10;
    exports.GEMINI_OMNI_FLASH_MAX_REF_VIDEOS = 3;
    exports.GEMINI_OMNI_FLASH_CREDITS_PER_SECOND = {
      "360p": 3,
      "720p": 10,
      "1080p": 15,
      "4k": 30
    };
    var RESOLUTION_ALIASES = {
      "360p": "360p",
      "360P": "360p",
      "720p": "720p",
      "720P": "720p",
      "1080p": "1080p",
      "1080P": "1080p",
      "1k": "1080p",
      "1K": "1080p",
      "2k": "1080p",
      "2K": "1080p",
      "4k": "4k",
      "4K": "4k",
      "2160p": "4k",
      "2160P": "4k"
    };
    var ASPECT_SET = new Set(exports.GEMINI_OMNI_FLASH_ASPECTS);
    var toUrlArray = (value, limit) => {
      if (!value)
        return [];
      const collected = [];
      const push = (v) => {
        if (typeof v === "string" && v.trim())
          collected.push(v.trim());
        else if (Array.isArray(v))
          v.forEach(push);
      };
      push(value);
      return Array.from(new Set(collected)).slice(0, limit);
    };
    var firstUrl = (value) => toUrlArray(value, 1)[0];
    function normalizeGeminiOmniFlashResolution(raw) {
      if (raw === void 0 || raw === null || raw === "")
        return exports.GEMINI_OMNI_FLASH_DEFAULT_RESOLUTION;
      const key = String(raw).trim();
      return RESOLUTION_ALIASES[key] ?? RESOLUTION_ALIASES[key.toLowerCase()] ?? exports.GEMINI_OMNI_FLASH_DEFAULT_RESOLUTION;
    }
    function normalizeGeminiOmniFlashDuration(raw) {
      if (raw === void 0 || raw === null || raw === "" || raw === "auto") {
        return exports.GEMINI_OMNI_FLASH_DEFAULT_DURATION;
      }
      const parsed = Number(raw);
      if (!Number.isFinite(parsed) || parsed <= 0)
        return exports.GEMINI_OMNI_FLASH_DEFAULT_DURATION;
      return Math.min(10, Math.max(3, Math.trunc(parsed)));
    }
    function normalizeGeminiOmniFlashAspectRatio(aspectRatio) {
      const raw = (aspectRatio ?? "").toString().trim();
      return ASPECT_SET.has(raw) ? raw : void 0;
    }
    function hasGeminiOmniFlashEditVideo(inputs = {}) {
      return Boolean(firstUrl(inputs.video_url ?? inputs.video_urls ?? inputs.video));
    }
    function geminiOmniFlashCreditCost(params) {
      const resolution = normalizeGeminiOmniFlashResolution(params.resolution);
      const cps = exports.GEMINI_OMNI_FLASH_CREDITS_PER_SECOND[resolution];
      const isEdit = params.kind === "edit" || params.kind === void 0 && hasGeminiOmniFlashEditVideo(params.dynamicInputs ?? {});
      if (isEdit)
        return cps * exports.GEMINI_OMNI_FLASH_EDIT_SECONDS;
      return cps * normalizeGeminiOmniFlashDuration(params.duration);
    }
    function resolveI2vFrames(params) {
      const { imageUrls = [], dynamicInputs = {}, refImages = [] } = params;
      const refs = new Set(refImages);
      const positional = imageUrls.map((url) => typeof url === "string" ? url.trim() : "").filter((url) => url.length > 0 && !refs.has(url));
      const namedStart = firstUrl(dynamicInputs.start_image ?? dynamicInputs.start_image_url ?? dynamicInputs.image_url);
      const namedEnd = firstUrl(dynamicInputs.end_image ?? dynamicInputs.end_image_url);
      const start = namedStart ?? positional[0];
      if (!start)
        return {};
      const end = namedEnd ?? positional.find((url) => url !== start);
      return { start, end: end === start ? void 0 : end };
    }
    function buildGeminiOmniFlashFalRequest(params) {
      const { prompt, imageUrls = [], aspectRatio, dynamicInputs = {} } = params;
      const common = {
        prompt,
        duration: normalizeGeminiOmniFlashDuration(dynamicInputs.duration),
        resolution: normalizeGeminiOmniFlashResolution(params.resolution ?? dynamicInputs.resolution)
      };
      const videoUrl = firstUrl(dynamicInputs.video_url ?? dynamicInputs.video_urls ?? dynamicInputs.video);
      if (videoUrl) {
        return {
          falModelId: exports.GEMINI_OMNI_FLASH_ENDPOINTS.edit,
          input: { prompt, video_url: videoUrl, resolution: common.resolution }
        };
      }
      const refImages = toUrlArray([dynamicInputs.reference_image_urls, dynamicInputs.reference_images, dynamicInputs.reference_image, dynamicInputs.reference_image_url], exports.GEMINI_OMNI_FLASH_MAX_REF_IMAGES);
      const refVideos = toUrlArray([dynamicInputs.reference_video_urls, dynamicInputs.reference_videos, dynamicInputs.reference_video, dynamicInputs.reference_video_url], exports.GEMINI_OMNI_FLASH_MAX_REF_VIDEOS);
      const { start, end } = resolveI2vFrames({ imageUrls, dynamicInputs, refImages });
      const ar = normalizeGeminiOmniFlashAspectRatio(aspectRatio ?? dynamicInputs.aspect_ratio);
      if (ar)
        common.aspect_ratio = ar;
      if (refImages.length || refVideos.length) {
        const imgs = Array.from(new Set([start, ...refImages].filter(Boolean))).slice(0, exports.GEMINI_OMNI_FLASH_MAX_REF_IMAGES);
        if (imgs.length)
          common.image_urls = imgs;
        if (refVideos.length)
          common.reference_video_urls = refVideos;
        return { falModelId: exports.GEMINI_OMNI_FLASH_ENDPOINTS.r2v, input: common };
      }
      if (!start && !refImages.length && !refVideos.length) {
        return { falModelId: exports.GEMINI_OMNI_FLASH_ENDPOINTS.t2v, input: common };
      }
      return {
        falModelId: exports.GEMINI_OMNI_FLASH_ENDPOINTS.i2v,
        input: {
          ...common,
          ...start ? { image_url: start } : {},
          ...end ? { end_image_url: end } : {}
        }
      };
    }
  }
});

// ../packages/workflow-contracts/dist/geminiOmniFlashV1.js
var require_geminiOmniFlashV1 = __commonJS({
  "../packages/workflow-contracts/dist/geminiOmniFlashV1.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GEMINI_OMNI_FLASH_V1_CREDITS_PER_SECOND = exports.GEMINI_OMNI_FLASH_V1_MAX_REF_IMAGES = exports.GEMINI_OMNI_FLASH_V1_DEFAULT_DURATION = exports.GEMINI_OMNI_FLASH_V1_DURATIONS = exports.GEMINI_OMNI_FLASH_V1_ASPECTS = exports.GEMINI_OMNI_FLASH_V1_EDIT_ENDPOINT_UNSUPPORTED = exports.GEMINI_OMNI_FLASH_V1_ENDPOINTS = void 0;
    exports.normalizeGeminiOmniFlashV1Duration = normalizeGeminiOmniFlashV1Duration;
    exports.normalizeGeminiOmniFlashV1AspectRatio = normalizeGeminiOmniFlashV1AspectRatio;
    exports.hasGeminiOmniFlashV1UnsupportedVideo = hasGeminiOmniFlashV1UnsupportedVideo;
    exports.geminiOmniFlashV1CreditCost = geminiOmniFlashV1CreditCost;
    exports.buildGeminiOmniFlashV1FalRequest = buildGeminiOmniFlashV1FalRequest;
    exports.GEMINI_OMNI_FLASH_V1_ENDPOINTS = {
      t2v: "google/gemini-omni-flash",
      i2v: "google/gemini-omni-flash/image-to-video",
      r2v: "google/gemini-omni-flash/reference-to-video"
    };
    exports.GEMINI_OMNI_FLASH_V1_EDIT_ENDPOINT_UNSUPPORTED = "google/gemini-omni-flash/edit";
    exports.GEMINI_OMNI_FLASH_V1_ASPECTS = ["16:9", "9:16"];
    exports.GEMINI_OMNI_FLASH_V1_DURATIONS = [3, 4, 5, 6, 7, 8, 9, 10];
    exports.GEMINI_OMNI_FLASH_V1_DEFAULT_DURATION = 8;
    exports.GEMINI_OMNI_FLASH_V1_MAX_REF_IMAGES = 10;
    exports.GEMINI_OMNI_FLASH_V1_CREDITS_PER_SECOND = 14;
    var ASPECT_SET = new Set(exports.GEMINI_OMNI_FLASH_V1_ASPECTS);
    var toUrlArray = (value, limit) => {
      if (!value)
        return [];
      const collected = [];
      const push = (v) => {
        if (typeof v === "string" && v.trim())
          collected.push(v.trim());
        else if (Array.isArray(v))
          v.forEach(push);
      };
      push(value);
      return Array.from(new Set(collected)).slice(0, limit);
    };
    var firstUrl = (value) => toUrlArray(value, 1)[0];
    function normalizeGeminiOmniFlashV1Duration(raw) {
      if (raw === void 0 || raw === null || raw === "" || raw === "auto") {
        return exports.GEMINI_OMNI_FLASH_V1_DEFAULT_DURATION;
      }
      const parsed = Number(raw);
      if (!Number.isFinite(parsed) || parsed <= 0)
        return exports.GEMINI_OMNI_FLASH_V1_DEFAULT_DURATION;
      return Math.min(10, Math.max(3, Math.trunc(parsed)));
    }
    function normalizeGeminiOmniFlashV1AspectRatio(aspectRatio) {
      const raw = (aspectRatio ?? "").toString().trim();
      return ASPECT_SET.has(raw) ? raw : void 0;
    }
    function hasGeminiOmniFlashV1UnsupportedVideo(inputs = {}) {
      return [
        inputs.video_url,
        inputs.video_urls,
        inputs.video,
        inputs.reference_video,
        inputs.reference_video_url,
        inputs.reference_video_urls
      ].some((field) => Boolean(firstUrl(field)));
    }
    function geminiOmniFlashV1CreditCost(params) {
      const duration = normalizeGeminiOmniFlashV1Duration(params.duration ?? params.dynamicInputs?.duration);
      return exports.GEMINI_OMNI_FLASH_V1_CREDITS_PER_SECOND * duration;
    }
    function resolveStartImage(params) {
      const { imageUrls = [], dynamicInputs = {}, refImages = [] } = params;
      const refs = new Set(refImages);
      const positional = imageUrls.map((url) => typeof url === "string" ? url.trim() : "").filter((url) => url.length > 0 && !refs.has(url));
      const named = firstUrl(dynamicInputs.start_image ?? dynamicInputs.start_image_url ?? dynamicInputs.image_url);
      return named ?? positional[0];
    }
    function buildGeminiOmniFlashV1FalRequest(params) {
      const { prompt, imageUrls = [], aspectRatio, dynamicInputs = {} } = params;
      if (hasGeminiOmniFlashV1UnsupportedVideo(dynamicInputs)) {
        throw new Error("Gemini Omni Flash V1 n'accepte aucune vid\xE9o en entr\xE9e : l'\xE9dition vid\xE9o de cette g\xE9n\xE9ration est r\xE9serv\xE9e \xE0 Gemini Omni Flash 1.1. Choisissez le 1.1.");
      }
      const common = {
        prompt,
        duration: normalizeGeminiOmniFlashV1Duration(dynamicInputs.duration)
      };
      const ar = normalizeGeminiOmniFlashV1AspectRatio(aspectRatio ?? dynamicInputs.aspect_ratio);
      if (ar)
        common.aspect_ratio = ar;
      const refImages = toUrlArray([
        dynamicInputs.reference_image_urls,
        dynamicInputs.reference_images,
        dynamicInputs.reference_image,
        dynamicInputs.reference_image_url
      ], exports.GEMINI_OMNI_FLASH_V1_MAX_REF_IMAGES);
      const start = resolveStartImage({ imageUrls, dynamicInputs, refImages });
      if (refImages.length) {
        const imgs = Array.from(new Set([start, ...refImages].filter(Boolean))).slice(0, exports.GEMINI_OMNI_FLASH_V1_MAX_REF_IMAGES);
        return {
          falModelId: exports.GEMINI_OMNI_FLASH_V1_ENDPOINTS.r2v,
          input: { ...common, image_urls: imgs }
        };
      }
      if (start) {
        return {
          falModelId: exports.GEMINI_OMNI_FLASH_V1_ENDPOINTS.i2v,
          input: { ...common, image_url: start }
        };
      }
      return { falModelId: exports.GEMINI_OMNI_FLASH_V1_ENDPOINTS.t2v, input: common };
    }
  }
});

// ../packages/workflow-contracts/dist/flux3.js
var require_flux3 = __commonJS({
  "../packages/workflow-contracts/dist/flux3.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.FLUX3_ENHANCE_CREDITS_PER_SECOND = exports.FLUX3_DRAFT_CREDITS_PER_SECOND = exports.FLUX3_FULL_CREDITS_PER_SECOND = exports.FLUX3_DEFAULT_SAFETY_TOLERANCE = exports.FLUX3_ASSUMED_FPS = exports.FLUX3_MAX_KEYFRAMES = exports.FLUX3_ENHANCE_BILLED_SECONDS = exports.FLUX3_EDIT_BILLED_SECONDS = exports.FLUX3_DEFAULT_RESOLUTION = exports.FLUX3_DEFAULT_DURATION = exports.FLUX3_DURATIONS = exports.FLUX3_ASPECTS = exports.FLUX3_RESOLUTIONS = exports.FLUX3_ENDPOINT_TO_KIND = exports.FLUX3_ENHANCE_ENDPOINT = exports.FLUX3_DRAFT_ENDPOINTS = exports.FLUX3_FULL_ENDPOINTS = void 0;
    exports.normalizeFlux3Resolution = normalizeFlux3Resolution;
    exports.normalizeFlux3Duration = normalizeFlux3Duration;
    exports.normalizeFlux3AspectRatio = normalizeFlux3AspectRatio;
    exports.normalizeFlux3SafetyTolerance = normalizeFlux3SafetyTolerance;
    exports.normalizeFlux3Keyframes = normalizeFlux3Keyframes;
    exports.isFlux3DraftRequested = isFlux3DraftRequested;
    exports.resolveFlux3Kind = resolveFlux3Kind;
    exports.flux3CreditCost = flux3CreditCost;
    exports.flux3EnhanceCreditCost = flux3EnhanceCreditCost;
    exports.buildFlux3FalRequest = buildFlux3FalRequest;
    exports.buildFlux3EnhanceFalRequest = buildFlux3EnhanceFalRequest;
    exports.readFlux3DraftCacheUrl = readFlux3DraftCacheUrl;
    var falPayloadGuards_1 = require_falPayloadGuards();
    exports.FLUX3_FULL_ENDPOINTS = {
      t2v: "blackforestlabs/flux-3/text-to-video",
      i2v: "blackforestlabs/flux-3/image-to-video",
      flf2v: "blackforestlabs/flux-3/first-last-frame-to-video",
      kf2v: "blackforestlabs/flux-3/keyframes-to-video",
      extend: "blackforestlabs/flux-3/extend-video",
      edit: "blackforestlabs/flux-3/edit-video"
    };
    exports.FLUX3_DRAFT_ENDPOINTS = {
      t2v: "blackforestlabs/flux-3/text-to-video/draft",
      i2v: "blackforestlabs/flux-3/image-to-video/draft",
      flf2v: "blackforestlabs/flux-3/first-last-frame-to-video/draft",
      kf2v: "blackforestlabs/flux-3/keyframes-to-video/draft",
      extend: "blackforestlabs/flux-3/extend-video/draft"
    };
    exports.FLUX3_ENHANCE_ENDPOINT = "blackforestlabs/flux-3/draft-enhance";
    exports.FLUX3_ENDPOINT_TO_KIND = {
      "blackforestlabs/flux-3/text-to-video": { kind: "t2v", draft: false },
      "blackforestlabs/flux-3/image-to-video": { kind: "i2v", draft: false },
      "blackforestlabs/flux-3/first-last-frame-to-video": { kind: "flf2v", draft: false },
      "blackforestlabs/flux-3/keyframes-to-video": { kind: "kf2v", draft: false },
      "blackforestlabs/flux-3/extend-video": { kind: "extend", draft: false },
      "blackforestlabs/flux-3/edit-video": { kind: "edit", draft: false },
      "blackforestlabs/flux-3/text-to-video/draft": { kind: "t2v", draft: true },
      "blackforestlabs/flux-3/image-to-video/draft": { kind: "i2v", draft: true },
      "blackforestlabs/flux-3/first-last-frame-to-video/draft": { kind: "flf2v", draft: true },
      "blackforestlabs/flux-3/keyframes-to-video/draft": { kind: "kf2v", draft: true },
      "blackforestlabs/flux-3/extend-video/draft": { kind: "extend", draft: true }
    };
    exports.FLUX3_RESOLUTIONS = ["720p", "1080p"];
    exports.FLUX3_ASPECTS = ["auto", "21:9", "2:1", "16:9", "4:3", "1:1", "3:4", "9:16"];
    exports.FLUX3_DURATIONS = [
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20
    ];
    exports.FLUX3_DEFAULT_DURATION = 5;
    exports.FLUX3_DEFAULT_RESOLUTION = "720p";
    exports.FLUX3_EDIT_BILLED_SECONDS = 15;
    exports.FLUX3_ENHANCE_BILLED_SECONDS = 20;
    exports.FLUX3_MAX_KEYFRAMES = 10;
    exports.FLUX3_ASSUMED_FPS = 24;
    exports.FLUX3_DEFAULT_SAFETY_TOLERANCE = 2;
    exports.FLUX3_FULL_CREDITS_PER_SECOND = {
      t2v: { "720p": 17, "1080p": 29 },
      i2v: { "720p": 17, "1080p": 29 },
      flf2v: { "720p": 17, "1080p": 29 },
      kf2v: { "720p": 17, "1080p": 29 },
      extend: { "720p": 41, "1080p": 53 },
      // Édition : 0,03 $/s, et NON 0,41 comme un premier relevé l'avait cru. La
      // page du modèle embarque le tarif de ses voisins ; le texte attrapé était
      // celui de la prolongation. Vérifié sur `llms.txt`, propre à cet endpoint :
      // « charged at **$0.03** per second of generated video (720p) ».
      // 1080p jamais envoyé (voir en-tête) ; valeur égale au 720p pour qu'aucun
      // chemin ne puisse sous-facturer si elle arrivait quand même.
      edit: { "720p": 3, "1080p": 3 }
    };
    exports.FLUX3_DRAFT_CREDITS_PER_SECOND = {
      t2v: 6,
      i2v: 6,
      flf2v: 6,
      kf2v: 6,
      extend: 12
    };
    exports.FLUX3_ENHANCE_CREDITS_PER_SECOND = 29;
    var refusal = (message) => {
      const err = new Error(message);
      err.code = "failed-precondition";
      return err;
    };
    var ASPECT_SET = new Set(exports.FLUX3_ASPECTS);
    var toUrlArray = (value, limit) => {
      if (!value)
        return [];
      const out = [];
      const push = (v) => {
        if (typeof v === "string" && v.trim())
          out.push(v.trim());
        else if (Array.isArray(v))
          v.forEach(push);
      };
      push(value);
      return Array.from(new Set(out)).slice(0, limit);
    };
    var firstUrl = (value) => toUrlArray(value, 1)[0];
    var readAlias = (inputs, keys) => {
      for (const key of keys) {
        const v = inputs[key];
        if (v !== void 0 && v !== null && v !== "")
          return v;
      }
      return void 0;
    };
    function normalizeFlux3Resolution(raw) {
      const value = raw === void 0 || raw === null ? void 0 : String(raw).trim();
      const out = (0, falPayloadGuards_1.normalizeModelResolution)(value || void 0, exports.FLUX3_RESOLUTIONS);
      return out === "1080p" ? "1080p" : exports.FLUX3_DEFAULT_RESOLUTION;
    }
    function normalizeFlux3Duration(raw) {
      if (raw === void 0 || raw === null || raw === "" || raw === "auto") {
        return exports.FLUX3_DEFAULT_DURATION;
      }
      const parsed = Number(raw);
      if (!Number.isFinite(parsed) || parsed <= 0)
        return exports.FLUX3_DEFAULT_DURATION;
      return Math.min(20, Math.max(5, Math.trunc(parsed)));
    }
    function normalizeFlux3AspectRatio(aspectRatio) {
      const raw = String(aspectRatio ?? "").trim();
      if (!raw || raw === "auto")
        return void 0;
      return ASPECT_SET.has(raw) ? raw : void 0;
    }
    function normalizeFlux3SafetyTolerance(raw) {
      const parsed = Number(raw);
      if (!Number.isFinite(parsed))
        return exports.FLUX3_DEFAULT_SAFETY_TOLERANCE;
      return Math.min(4, Math.max(0, Math.trunc(parsed)));
    }
    function normalizeFlux3Keyframes(raw, duration) {
      if (!Array.isArray(raw) || raw.length === 0)
        return [];
      const structured = [];
      const bare = [];
      for (const entry of raw) {
        if (typeof entry === "string" && entry.trim()) {
          bare.push(entry.trim());
        } else if (entry && typeof entry === "object") {
          const o = entry;
          const url = firstUrl(o.image_url ?? o.url ?? o.imageUrl);
          if (!url)
            continue;
          const idx = Number(o.frame_index ?? o.frameIndex);
          if (Number.isFinite(idx) && idx >= 0)
            structured.push({ frame_index: Math.trunc(idx), image_url: url });
          else
            bare.push(url);
        }
      }
      if (structured.length && !bare.length) {
        return dedupeByFrameIndex(structured).slice(0, exports.FLUX3_MAX_KEYFRAMES);
      }
      const urls = Array.from(/* @__PURE__ */ new Set([...structured.map((k) => k.image_url), ...bare])).slice(0, exports.FLUX3_MAX_KEYFRAMES);
      if (!urls.length)
        return [];
      const lastFrame = Math.max(1, duration * exports.FLUX3_ASSUMED_FPS - 1);
      const step = urls.length > 1 ? Math.floor(lastFrame / (urls.length - 1)) : 0;
      return urls.map((image_url, i) => ({ frame_index: i * step, image_url }));
    }
    function dedupeByFrameIndex(frames) {
      const seen = /* @__PURE__ */ new Set();
      const out = [];
      for (const f of frames.slice().sort((a, b) => a.frame_index - b.frame_index)) {
        if (seen.has(f.frame_index))
          continue;
        seen.add(f.frame_index);
        out.push(f);
      }
      return out;
    }
    function isFlux3DraftRequested(inputs = {}) {
      const v = readAlias(inputs, ["draft", "draft_mode", "is_draft"]);
      return v === true || v === "true" || v === 1 || v === "1";
    }
    function resolveFlux3Kind(params) {
      const { imageUrls = [], dynamicInputs = {} } = params;
      const videoUrl = firstUrl(readAlias(dynamicInputs, ["video_url", "video_urls", "video"]));
      if (videoUrl) {
        const mode = String(readAlias(dynamicInputs, ["mode"]) ?? "").trim().toLowerCase();
        return mode === "extend" || mode === "extend-video" ? "extend" : "edit";
      }
      const keyframes = readAlias(dynamicInputs, ["keyframes", "keyframe_images"]);
      if (Array.isArray(keyframes) && keyframes.length > 0)
        return "kf2v";
      const start = firstUrl(readAlias(dynamicInputs, ["start_image", "start_image_url", "image_url"]));
      const end = firstUrl(readAlias(dynamicInputs, ["end_image", "end_image_url"]));
      const positional = imageUrls.filter((u) => typeof u === "string" && u.trim());
      const first = start ?? positional[0] ?? end;
      const last = first === end ? void 0 : end ?? positional.find((u) => u !== first);
      if (first && last)
        return "flf2v";
      if (first)
        return "i2v";
      return "t2v";
    }
    function flux3CreditCost(params) {
      const dynamicInputs = params.dynamicInputs ?? {};
      const fromEndpoint = params.falModelId ? exports.FLUX3_ENDPOINT_TO_KIND[String(params.falModelId)] : void 0;
      const kind = fromEndpoint?.kind ?? params.kind ?? resolveFlux3Kind({ imageUrls: params.imageUrls, dynamicInputs });
      const draft = fromEndpoint ? fromEndpoint.draft : params.draft ?? isFlux3DraftRequested(dynamicInputs);
      if (kind === "edit") {
        return exports.FLUX3_FULL_CREDITS_PER_SECOND.edit["720p"] * exports.FLUX3_EDIT_BILLED_SECONDS;
      }
      const duration = normalizeFlux3Duration(params.duration ?? dynamicInputs.duration);
      if (draft)
        return exports.FLUX3_DRAFT_CREDITS_PER_SECOND[kind] * duration;
      const resolution = normalizeFlux3Resolution(params.resolution ?? dynamicInputs.resolution);
      return exports.FLUX3_FULL_CREDITS_PER_SECOND[kind][resolution] * duration;
    }
    function flux3EnhanceCreditCost() {
      return exports.FLUX3_ENHANCE_CREDITS_PER_SECOND * exports.FLUX3_ENHANCE_BILLED_SECONDS;
    }
    function buildFlux3FalRequest(params) {
      const { prompt, imageUrls = [], aspectRatio, dynamicInputs = {} } = params;
      const kind = resolveFlux3Kind({ imageUrls, dynamicInputs });
      const draft = isFlux3DraftRequested(dynamicInputs);
      const safety = normalizeFlux3SafetyTolerance(readAlias(dynamicInputs, ["safety_tolerance"]));
      if (kind === "edit") {
        if (draft) {
          throw refusal("FLUX 3 ne propose pas de brouillon pour l'\xE9dition vid\xE9o. D\xE9cochez \xAB Brouillon \xBB, ou passez en mode Prolonger, qui en a un.");
        }
        const videoUrl = firstUrl(readAlias(dynamicInputs, ["video_url", "video_urls", "video"]));
        return {
          falModelId: exports.FLUX3_FULL_ENDPOINTS.edit,
          input: {
            prompt,
            video_url: videoUrl,
            // 720p imposé : FAL ne publie pas le prix du 1080p sur cet endpoint.
            resolution: "720p",
            safety_tolerance: safety
          }
        };
      }
      const duration = normalizeFlux3Duration(dynamicInputs.duration);
      const input = { prompt, duration, safety_tolerance: safety };
      const ar = normalizeFlux3AspectRatio(aspectRatio ?? dynamicInputs.aspect_ratio);
      if (ar)
        input.aspect_ratio = ar;
      const audio = readAlias(dynamicInputs, ["generate_audio"]);
      if (audio !== void 0)
        input.generate_audio = audio === true || audio === "true";
      if (!draft) {
        input.resolution = normalizeFlux3Resolution(params.resolution ?? dynamicInputs.resolution);
      }
      const endpoint = draft ? exports.FLUX3_DRAFT_ENDPOINTS[kind] : exports.FLUX3_FULL_ENDPOINTS[kind];
      if (kind === "extend") {
        input.video_url = firstUrl(readAlias(dynamicInputs, ["video_url", "video_urls", "video"]));
        return { falModelId: endpoint, input };
      }
      if (kind === "kf2v") {
        const frames = normalizeFlux3Keyframes(readAlias(dynamicInputs, ["keyframes", "keyframe_images"]), duration);
        if (!frames.length) {
          throw refusal("FLUX 3 keyframes : aucune image exploitable dans la liste fournie.");
        }
        input.keyframes = frames;
        return { falModelId: endpoint, input };
      }
      const start = firstUrl(readAlias(dynamicInputs, ["start_image", "start_image_url", "image_url"]));
      const end = firstUrl(readAlias(dynamicInputs, ["end_image", "end_image_url"]));
      const positional = imageUrls.filter((u) => typeof u === "string" && u.trim());
      const first = start ?? positional[0] ?? end;
      const last = first === end ? void 0 : end ?? positional.find((u) => u !== first);
      if (kind === "flf2v") {
        input.start_image_url = first;
        input.end_image_url = last;
        return { falModelId: endpoint, input };
      }
      if (kind === "i2v") {
        input.image_url = first;
        return { falModelId: endpoint, input };
      }
      return { falModelId: endpoint, input };
    }
    function buildFlux3EnhanceFalRequest(params) {
      const dynamicInputs = params.dynamicInputs ?? {};
      const cacheUrl = firstUrl(readAlias(dynamicInputs, ["draft_cache_url", "draft_cache", "draftCacheUrl"]));
      if (!cacheUrl) {
        throw refusal("FLUX 3 Enhance a besoin du cache du brouillon \xE0 re-rendre. Ce cache vient de la g\xE9n\xE9ration en brouillon ; FAL ne le rend pas toujours, et sans lui le rendu pleine qualit\xE9 est impossible.");
      }
      return {
        falModelId: exports.FLUX3_ENHANCE_ENDPOINT,
        input: {
          draft_cache_url: cacheUrl,
          safety_tolerance: normalizeFlux3SafetyTolerance(readAlias(dynamicInputs, ["safety_tolerance"]))
        }
      };
    }
    function readFlux3DraftCacheUrl(response) {
      if (!response || typeof response !== "object")
        return void 0;
      const cache = response.draft_cache;
      if (!cache)
        return void 0;
      if (typeof cache === "string")
        return cache.trim() || void 0;
      if (typeof cache === "object") {
        const url = cache.url;
        if (typeof url === "string" && url.trim())
          return url.trim();
      }
      return void 0;
    }
  }
});

// ../packages/workflow-contracts/dist/klingO34k.js
var require_klingO34k = __commonJS({
  "../packages/workflow-contracts/dist/klingO34k.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.KLING_O3_4K_ENDPOINTS = exports.KLING_O3_4K_MAX_REF_IMAGES = exports.KLING_O3_4K_ASPECTS = exports.KLING_O3_4K_DURATIONS = exports.KLING_O3_4K_USD_PER_SECOND = exports.KLING_O3_4K_EDIT_MAX_SOURCE_SECONDS = exports.KLING_O3_4K_EDIT_SECONDS = exports.KLING_O3_4K_DEFAULT_DURATION = exports.KLING_O3_4K_CREDITS_PER_SECOND = void 0;
    exports.normalizeKlingO34kDuration = normalizeKlingO34kDuration;
    exports.klingO34kSentDuration = klingO34kSentDuration;
    exports.normalizeKlingO34kAspectRatio = normalizeKlingO34kAspectRatio;
    exports.hasKlingO34kEditVideo = hasKlingO34kEditVideo;
    exports.klingO34kCreditCost = klingO34kCreditCost;
    exports.buildKlingO34kFalRequest = buildKlingO34kFalRequest;
    exports.KLING_O3_4K_CREDITS_PER_SECOND = 42;
    exports.KLING_O3_4K_DEFAULT_DURATION = 5;
    exports.KLING_O3_4K_EDIT_SECONDS = 10;
    exports.KLING_O3_4K_EDIT_MAX_SOURCE_SECONDS = 15.05;
    exports.KLING_O3_4K_USD_PER_SECOND = 0.42;
    exports.KLING_O3_4K_DURATIONS = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    exports.KLING_O3_4K_ASPECTS = ["16:9", "9:16", "1:1"];
    exports.KLING_O3_4K_MAX_REF_IMAGES = 7;
    exports.KLING_O3_4K_ENDPOINTS = {
      t2v: "fal-ai/kling-video/o3/4k/text-to-video",
      i2v: "fal-ai/kling-video/o3/4k/image-to-video",
      r2v: "fal-ai/kling-video/o3/4k/reference-to-video",
      edit: "fal-ai/kling-video/o3/4k/video-to-video/edit",
      v2vRef: "fal-ai/kling-video/o3/4k/video-to-video/reference"
    };
    var ASPECT_SET = new Set(exports.KLING_O3_4K_ASPECTS);
    var toUrlArray = (value, limit) => {
      if (!value)
        return [];
      const collected = [];
      const push = (v) => {
        if (typeof v === "string" && v.trim())
          collected.push(v.trim());
        else if (Array.isArray(v))
          v.forEach(push);
      };
      push(value);
      return Array.from(new Set(collected)).slice(0, limit);
    };
    var firstUrl = (value) => toUrlArray(value, 1)[0];
    function normalizeKlingO34kDuration(raw) {
      if (raw === void 0 || raw === null || raw === "" || raw === "auto")
        return exports.KLING_O3_4K_DEFAULT_DURATION;
      const parsed = Number(raw);
      if (!Number.isFinite(parsed) || parsed <= 0)
        return exports.KLING_O3_4K_DEFAULT_DURATION;
      return Math.min(15, Math.max(3, Math.trunc(parsed)));
    }
    function klingO34kSentDuration(raw) {
      return String(normalizeKlingO34kDuration(raw));
    }
    function normalizeKlingO34kAspectRatio(aspectRatio) {
      const raw = (aspectRatio ?? "").toString().trim();
      return ASPECT_SET.has(raw) ? raw : void 0;
    }
    function hasKlingO34kEditVideo(inputs = {}) {
      return Boolean(firstUrl(inputs.video_url ?? inputs.video_urls ?? inputs.video));
    }
    function klingO34kCreditCost(params) {
      const inputs = params.dynamicInputs ?? {};
      const isEdit = params.kind === "edit" || params.kind === void 0 && hasKlingO34kEditVideo(inputs) && inputs.mode !== "reference";
      if (isEdit) {
        const raw = params.duration ?? inputs.duration;
        const known = raw !== void 0 && raw !== null && raw !== "" && raw !== "auto" && Number.isFinite(Number(raw));
        const legacy = exports.KLING_O3_4K_CREDITS_PER_SECOND * (known ? normalizeKlingO34kDuration(raw) : exports.KLING_O3_4K_EDIT_SECONDS);
        const measured = typeof params.sourceSeconds === "number" && Number.isFinite(params.sourceSeconds) && params.sourceSeconds >= 0 ? Math.min(exports.KLING_O3_4K_EDIT_MAX_SOURCE_SECONDS, params.sourceSeconds) : exports.KLING_O3_4K_EDIT_MAX_SOURCE_SECONDS;
        const credits = Math.ceil(Math.round(exports.KLING_O3_4K_USD_PER_SECOND * measured * 100 * 1e6) / 1e6);
        return Math.max(legacy, credits);
      }
      return exports.KLING_O3_4K_CREDITS_PER_SECOND * normalizeKlingO34kDuration(params.duration ?? inputs.duration);
    }
    function resolveFrames(params) {
      const { imageUrls = [], dynamicInputs = {} } = params;
      const positional = imageUrls.map((url) => typeof url === "string" ? url.trim() : "").filter((url) => url.length > 0);
      const namedStart = firstUrl(dynamicInputs.start_image ?? dynamicInputs.start_image_url ?? dynamicInputs.image_url);
      const namedEnd = firstUrl(dynamicInputs.end_image ?? dynamicInputs.end_image_url);
      const start = namedStart ?? positional[0];
      if (!start)
        return {};
      const end = namedEnd ?? positional.find((url) => url !== start);
      return { start, end: end === start ? void 0 : end };
    }
    function collectRefImages(params) {
      const { dynamicInputs = {}, start, end } = params;
      return toUrlArray([dynamicInputs.reference_image_urls, dynamicInputs.reference_images, dynamicInputs.reference_image, dynamicInputs.reference_image_url, dynamicInputs.image_urls], exports.KLING_O3_4K_MAX_REF_IMAGES).filter((url) => url !== start && url !== end);
    }
    function optionalElements(dynamicInputs) {
      const raw = dynamicInputs.elements;
      return Array.isArray(raw) && raw.length > 0 ? raw : void 0;
    }
    function shotType(dynamicInputs) {
      return dynamicInputs.shot_type === "customize" || dynamicInputs.shot_type === "intelligent" ? dynamicInputs.shot_type : void 0;
    }
    function generateAudio(dynamicInputs) {
      return dynamicInputs.generate_audio === void 0 ? false : Boolean(dynamicInputs.generate_audio);
    }
    function buildKlingO34kFalRequest(params) {
      const { prompt, imageUrls = [], aspectRatio, dynamicInputs = {} } = params;
      const videoUrl = firstUrl(dynamicInputs.video_url ?? dynamicInputs.video_urls ?? dynamicInputs.video);
      const { start, end } = resolveFrames({ imageUrls, dynamicInputs });
      const refImages = collectRefImages({ imageUrls, dynamicInputs, start, end });
      const elements = optionalElements(dynamicInputs);
      const duration = klingO34kSentDuration(dynamicInputs.duration);
      const ar = normalizeKlingO34kAspectRatio(aspectRatio ?? dynamicInputs.aspect_ratio);
      const shot = shotType(dynamicInputs);
      const common = { prompt, generate_audio: generateAudio(dynamicInputs), ...shot ? { shot_type: shot } : {} };
      if (Array.isArray(dynamicInputs.multi_prompt) && dynamicInputs.multi_prompt.length > 0)
        common.multi_prompt = dynamicInputs.multi_prompt;
      if (videoUrl && dynamicInputs.mode === "reference") {
        const v2vRefImages = refImages.slice(0, 4);
        return { falModelId: exports.KLING_O3_4K_ENDPOINTS.v2vRef, input: { prompt, video_url: videoUrl, duration, ...ar ? { aspect_ratio: ar } : {}, ...v2vRefImages.length > 0 ? { image_urls: v2vRefImages } : {}, ...elements ? { elements } : {}, ...shot ? { shot_type: shot } : {}, ...typeof dynamicInputs.keep_audio === "boolean" ? { keep_audio: dynamicInputs.keep_audio } : {} } };
      }
      if (videoUrl) {
        const v2vRefImages = refImages.slice(0, 4);
        return { falModelId: exports.KLING_O3_4K_ENDPOINTS.edit, input: { prompt, video_url: videoUrl, ...typeof dynamicInputs.keep_audio === "boolean" ? { keep_audio: dynamicInputs.keep_audio } : {}, ...v2vRefImages.length > 0 ? { image_urls: v2vRefImages } : {}, ...elements ? { elements } : {}, ...shot ? { shot_type: shot } : {} } };
      }
      const wantsReference = dynamicInputs.mode === "reference" || refImages.length > 0 || Boolean(elements);
      if (wantsReference) {
        return { falModelId: exports.KLING_O3_4K_ENDPOINTS.r2v, input: { ...common, duration, ...ar ? { aspect_ratio: ar } : {}, ...start ? { start_image_url: start } : {}, ...end ? { end_image_url: end } : {}, ...refImages.length > 0 ? { image_urls: refImages } : {}, ...elements ? { elements } : {} } };
      }
      if (start) {
        return { falModelId: exports.KLING_O3_4K_ENDPOINTS.i2v, input: { ...common, duration, image_url: start, ...end ? { end_image_url: end } : {} } };
      }
      return { falModelId: exports.KLING_O3_4K_ENDPOINTS.t2v, input: { ...common, duration, ...ar ? { aspect_ratio: ar } : {} } };
    }
  }
});

// ../packages/workflow-contracts/dist/klingO3VideoToVideo.js
var require_klingO3VideoToVideo = __commonJS({
  "../packages/workflow-contracts/dist/klingO3VideoToVideo.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.buildKlingO3VideoToVideoFalRequest = exports.klingO3VideoToVideoCreditCost = exports.normalizeKlingO34kReferenceDuration = exports.KLING_O3_4K_REFERENCE_ASPECTS = exports.KLING_O3_4K_REFERENCE_DURATIONS = exports.KLING_O3_4K_REFERENCE_DEFAULT_DURATION = exports.KLING_O3_4K_REFERENCE_CREDITS_PER_SECOND = exports.KLING_O3_V2V_MAX_SOURCE_SECONDS = exports.KLING_O3_PRO_EDIT_CREDITS_PER_SECOND = exports.KLING_O3_PRO_EDIT_MAX_SECONDS = exports.KLING_O3_VIDEO_TO_VIDEO_MAX_REFERENCE_IMAGES = exports.KLING_O3_VIDEO_TO_VIDEO_ENDPOINTS = void 0;
    exports.KLING_O3_VIDEO_TO_VIDEO_ENDPOINTS = {
      "pro-edit": "fal-ai/kling-video/o3/pro/video-to-video/edit",
      "4k-reference": "fal-ai/kling-video/o3/4k/video-to-video/reference"
    };
    exports.KLING_O3_VIDEO_TO_VIDEO_MAX_REFERENCE_IMAGES = 4;
    exports.KLING_O3_PRO_EDIT_MAX_SECONDS = 10;
    exports.KLING_O3_PRO_EDIT_CREDITS_PER_SECOND = 16.8;
    exports.KLING_O3_V2V_MAX_SOURCE_SECONDS = 15.05;
    exports.KLING_O3_4K_REFERENCE_CREDITS_PER_SECOND = 42;
    exports.KLING_O3_4K_REFERENCE_DEFAULT_DURATION = 5;
    exports.KLING_O3_4K_REFERENCE_DURATIONS = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    exports.KLING_O3_4K_REFERENCE_ASPECTS = ["auto", "16:9", "9:16", "1:1"];
    var toUrls = (value) => {
      const urls = [];
      const append = (entry) => {
        if (typeof entry === "string" && entry.trim())
          urls.push(entry.trim());
        else if (Array.isArray(entry))
          entry.forEach(append);
      };
      append(value);
      return urls;
    };
    var firstUrl = (value) => toUrls(value)[0];
    var normalizeKlingO34kReferenceDuration = (value) => {
      if (value === void 0 || value === null || value === "" || value === "auto") {
        return exports.KLING_O3_4K_REFERENCE_DEFAULT_DURATION;
      }
      const parsed = Number(value);
      if (!Number.isFinite(parsed))
        return exports.KLING_O3_4K_REFERENCE_DEFAULT_DURATION;
      return Math.min(15, Math.max(3, Math.trunc(parsed)));
    };
    exports.normalizeKlingO34kReferenceDuration = normalizeKlingO34kReferenceDuration;
    var normalizeReferenceAspectRatio = (value) => {
      const normalized = String(value || "auto");
      return exports.KLING_O3_4K_REFERENCE_ASPECTS.includes(normalized) ? normalized : "auto";
    };
    var collectReferenceImages = (imageUrls, dynamicInputs) => Array.from(new Set(toUrls([
      imageUrls,
      dynamicInputs.reference_image,
      dynamicInputs.reference_image_url,
      dynamicInputs.reference_images,
      dynamicInputs.reference_image_urls,
      dynamicInputs.image_urls
    ]))).slice(0, exports.KLING_O3_VIDEO_TO_VIDEO_MAX_REFERENCE_IMAGES);
    var ceilCredits = (usd) => Math.ceil(Math.round(usd * 100 * 1e6) / 1e6);
    var klingO3VideoToVideoCreditCost = (params) => {
      const source = typeof params.sourceSeconds === "number" && Number.isFinite(params.sourceSeconds) && params.sourceSeconds >= 0 ? Math.min(exports.KLING_O3_V2V_MAX_SOURCE_SECONDS, params.sourceSeconds) : exports.KLING_O3_V2V_MAX_SOURCE_SECONDS;
      if (params.variant === "pro-edit") {
        const legacy2 = exports.KLING_O3_PRO_EDIT_CREDITS_PER_SECOND * exports.KLING_O3_PRO_EDIT_MAX_SECONDS;
        return Math.max(legacy2, ceilCredits(exports.KLING_O3_PRO_EDIT_CREDITS_PER_SECOND / 100 * source));
      }
      const duration = (0, exports.normalizeKlingO34kReferenceDuration)(params.duration ?? params.dynamicInputs?.duration);
      const legacy = exports.KLING_O3_4K_REFERENCE_CREDITS_PER_SECOND * duration;
      if (!params.durationLeftToModel)
        return legacy;
      return Math.max(legacy, ceilCredits(exports.KLING_O3_4K_REFERENCE_CREDITS_PER_SECOND / 100 * source));
    };
    exports.klingO3VideoToVideoCreditCost = klingO3VideoToVideoCreditCost;
    var buildKlingO3VideoToVideoFalRequest = (params) => {
      const { variant, prompt, imageUrls = [], aspectRatio, dynamicInputs = {} } = params;
      const videoUrl = firstUrl(dynamicInputs.video_url ?? dynamicInputs.video_urls ?? dynamicInputs.video);
      if (!videoUrl) {
        throw new Error("Kling O3 vid\xE9o-vers-vid\xE9o n\xE9cessite une vid\xE9o en entr\xE9e (video_url).");
      }
      const referenceImages = collectReferenceImages(imageUrls, dynamicInputs);
      const input = {
        prompt,
        video_url: videoUrl,
        keep_audio: dynamicInputs.keep_audio === void 0 ? true : Boolean(dynamicInputs.keep_audio)
      };
      if (referenceImages.length > 0)
        input.image_urls = referenceImages;
      if (dynamicInputs.shot_type === "customize" || dynamicInputs.shot_type === "intelligent") {
        input.shot_type = dynamicInputs.shot_type;
      }
      if (Array.isArray(dynamicInputs.elements) && dynamicInputs.elements.length > 0) {
        input.elements = dynamicInputs.elements;
      }
      if (variant === "4k-reference") {
        input.duration = String((0, exports.normalizeKlingO34kReferenceDuration)(dynamicInputs.duration));
        input.aspect_ratio = normalizeReferenceAspectRatio(aspectRatio ?? dynamicInputs.aspect_ratio);
      }
      return { falModelId: exports.KLING_O3_VIDEO_TO_VIDEO_ENDPOINTS[variant], input };
    };
    exports.buildKlingO3VideoToVideoFalRequest = buildKlingO3VideoToVideoFalRequest;
  }
});

// ../packages/workflow-contracts/dist/minimaxH3MaxTurbo.js
var require_minimaxH3MaxTurbo = __commonJS({
  "../packages/workflow-contracts/dist/minimaxH3MaxTurbo.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.H3MAX_TURBO_1080P_CREDITS_PER_SECOND = exports.H3MAX_TURBO_CREDITS_PER_SECOND = exports.H3MAX_TURBO_DEFAULT_DURATION = exports.H3MAX_TURBO_DEFAULT_RESOLUTION = exports.H3MAX_TURBO_ENDPOINTS = exports.H3MAX_TURBO_T2V_ASPECTS = exports.H3MAX_TURBO_DURATIONS = exports.H3MAX_TURBO_RESOLUTIONS = void 0;
    exports.normalizeH3MaxTurboResolution = normalizeH3MaxTurboResolution;
    exports.normalizeH3MaxTurboDuration = normalizeH3MaxTurboDuration;
    exports.normalizeH3MaxTurboAspectRatio = normalizeH3MaxTurboAspectRatio;
    exports.h3MaxTurboCreditCost = h3MaxTurboCreditCost;
    exports.buildH3MaxTurboFalRequest = buildH3MaxTurboFalRequest;
    exports.H3MAX_TURBO_RESOLUTIONS = ["768P", "480P", "1080P"];
    exports.H3MAX_TURBO_DURATIONS = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    exports.H3MAX_TURBO_T2V_ASPECTS = ["21:9", "16:9", "4:3", "1:1", "3:4", "9:16"];
    exports.H3MAX_TURBO_ENDPOINTS = {
      t2v: "minimax/h3-max-turbo/text-to-video",
      i2v: "minimax/h3-max-turbo/image-to-video"
    };
    exports.H3MAX_TURBO_DEFAULT_RESOLUTION = "768P";
    exports.H3MAX_TURBO_DEFAULT_DURATION = 5;
    exports.H3MAX_TURBO_CREDITS_PER_SECOND = {
      "480P": 2.5,
      "768P": 4,
      "1080P": 8
    };
    var RESOLUTION_ALIASES = {
      "480p": "480P",
      "480P": "480P",
      "768p": "768P",
      "768P": "768P",
      "720p": "768P",
      "1080p": "1080P",
      "1080P": "1080P",
      "1440p": "768P",
      "2160p": "768P",
      "2k": "768P",
      "2K": "768P",
      "4k": "768P",
      "4K": "768P"
    };
    var T2V_ASPECT_SET = new Set(exports.H3MAX_TURBO_T2V_ASPECTS);
    var toUrlArray = (value, limit) => {
      if (!value)
        return [];
      const collected = [];
      const push = (v) => {
        if (typeof v === "string" && v.trim())
          collected.push(v.trim());
        else if (Array.isArray(v))
          v.forEach(push);
      };
      push(value);
      return Array.from(new Set(collected)).slice(0, limit);
    };
    var firstUrl = (value) => toUrlArray(value, 1)[0];
    function normalizeH3MaxTurboResolution(raw) {
      if (raw === void 0 || raw === null || raw === "")
        return exports.H3MAX_TURBO_DEFAULT_RESOLUTION;
      const key = String(raw).trim();
      if (RESOLUTION_ALIASES[key])
        return RESOLUTION_ALIASES[key];
      const lower = key.toLowerCase();
      if (RESOLUTION_ALIASES[lower])
        return RESOLUTION_ALIASES[lower];
      return exports.H3MAX_TURBO_DEFAULT_RESOLUTION;
    }
    function normalizeH3MaxTurboDuration(raw) {
      if (raw === void 0 || raw === null || raw === "" || raw === "auto") {
        return exports.H3MAX_TURBO_DEFAULT_DURATION;
      }
      const parsed = Number(raw);
      if (!Number.isFinite(parsed) || parsed <= 0)
        return exports.H3MAX_TURBO_DEFAULT_DURATION;
      return Math.min(15, Math.max(5, Math.trunc(parsed)));
    }
    function normalizeH3MaxTurboAspectRatio(aspectRatio, kind) {
      if (kind === "i2v")
        return void 0;
      const raw = (aspectRatio ?? "").toString().trim();
      return T2V_ASPECT_SET.has(raw) ? raw : void 0;
    }
    exports.H3MAX_TURBO_1080P_CREDITS_PER_SECOND = exports.H3MAX_TURBO_CREDITS_PER_SECOND["1080P"];
    function h3MaxTurboCreditCost(params) {
      const duration = normalizeH3MaxTurboDuration(params.duration);
      const perSecond = params.sentResolution === "1080P" ? exports.H3MAX_TURBO_1080P_CREDITS_PER_SECOND : exports.H3MAX_TURBO_CREDITS_PER_SECOND[normalizeH3MaxTurboResolution(params.resolution)];
      return perSecond * duration;
    }
    function resolveI2vFrames(params) {
      const { imageUrls = [], dynamicInputs = {} } = params;
      const positional = imageUrls.map((url) => typeof url === "string" ? url.trim() : "").filter((url) => url.length > 0);
      const namedStart = firstUrl(dynamicInputs.start_image ?? dynamicInputs.start_image_url ?? dynamicInputs.image_url);
      const namedEnd = firstUrl(dynamicInputs.end_image ?? dynamicInputs.end_image_url);
      const start = namedStart ?? positional[0];
      if (!start)
        return {};
      const end = namedEnd ?? positional.find((url) => url !== start);
      return { start, end: end === start ? void 0 : end };
    }
    function optionalSeed(dynamicInputs) {
      const raw = dynamicInputs.seed;
      if (raw === void 0 || raw === null || raw === "")
        return void 0;
      const seed = Number(raw);
      return Number.isFinite(seed) ? seed : void 0;
    }
    function expansionMode(dynamicInputs) {
      return dynamicInputs.prompt_expansion_mode === "quality" ? "quality" : "balanced";
    }
    function buildH3MaxTurboFalRequest(params) {
      const { kind, prompt, imageUrls, resolution, aspectRatio, dynamicInputs = {} } = params;
      const common = {
        prompt,
        duration: normalizeH3MaxTurboDuration(dynamicInputs.duration),
        resolution: normalizeH3MaxTurboResolution(resolution ?? dynamicInputs.resolution),
        prompt_expansion_mode: expansionMode(dynamicInputs)
      };
      const seed = optionalSeed(dynamicInputs);
      if (seed !== void 0)
        common.seed = seed;
      if (typeof dynamicInputs.enable_safety_checker === "boolean") {
        common.enable_safety_checker = dynamicInputs.enable_safety_checker;
      }
      if (kind === "t2v") {
        const ar = normalizeH3MaxTurboAspectRatio(aspectRatio ?? dynamicInputs.aspect_ratio, "t2v");
        return {
          falModelId: exports.H3MAX_TURBO_ENDPOINTS.t2v,
          input: { ...common, ...ar ? { aspect_ratio: ar } : {} }
        };
      }
      const { start, end } = resolveI2vFrames({ imageUrls, dynamicInputs });
      return {
        falModelId: exports.H3MAX_TURBO_ENDPOINTS.i2v,
        input: {
          ...common,
          ...start ? { image_url: start } : {},
          ...end ? { end_image_url: end } : {}
        }
      };
    }
  }
});

// ../packages/workflow-contracts/dist/minimaxH3MultiAngle.js
var require_minimaxH3MultiAngle = __commonJS({
  "../packages/workflow-contracts/dist/minimaxH3MultiAngle.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.H3_CAMERA_PRESETS = exports.H3_MULTI_ANGLE_MAX_DISTANCE = exports.H3_MULTI_ANGLE_MIN_DISTANCE = exports.H3_MULTI_ANGLE_MAX_AZIMUTH_TRAVEL = exports.H3_MULTI_ANGLE_MAX_KEYFRAMES = exports.H3_MULTI_ANGLE_MIN_KEYFRAMES = exports.H3_MULTI_ANGLE_DEFAULT_DURATION = exports.H3_MULTI_ANGLE_DEFAULT_RESOLUTION = exports.H3_MULTI_ANGLE_DURATIONS = exports.H3_MULTI_ANGLE_RESOLUTIONS = exports.H3_MULTI_ANGLE_ENDPOINT = void 0;
    exports.normalizeH3MultiAngleResolution = normalizeH3MultiAngleResolution;
    exports.normalizeH3MultiAngleDuration = normalizeH3MultiAngleDuration;
    exports.normalizeH3CameraTrajectory = normalizeH3CameraTrajectory;
    exports.h3MultiAngleCreditCost = h3MultiAngleCreditCost;
    exports.interpolateH3CameraPose = interpolateH3CameraPose;
    exports.sampleH3CameraPreset = sampleH3CameraPreset;
    exports.defaultH3CameraTrajectory = defaultH3CameraTrajectory;
    exports.buildH3MultiAngleFalRequest = buildH3MultiAngleFalRequest;
    exports.H3_MULTI_ANGLE_ENDPOINT = "minimax/h3-max/multi-angle/image-to-video";
    exports.H3_MULTI_ANGLE_RESOLUTIONS = [
      "480P",
      "768P",
      "1080P"
    ];
    exports.H3_MULTI_ANGLE_DURATIONS = [
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15
    ];
    exports.H3_MULTI_ANGLE_DEFAULT_RESOLUTION = "480P";
    exports.H3_MULTI_ANGLE_DEFAULT_DURATION = 5;
    exports.H3_MULTI_ANGLE_MIN_KEYFRAMES = 2;
    exports.H3_MULTI_ANGLE_MAX_KEYFRAMES = 12;
    exports.H3_MULTI_ANGLE_MAX_AZIMUTH_TRAVEL = 32 * 360;
    exports.H3_MULTI_ANGLE_MIN_DISTANCE = 0.05;
    exports.H3_MULTI_ANGLE_MAX_DISTANCE = 4;
    var USD_PER_SECOND = {
      "480P": 0.05,
      "768P": 0.08,
      "1080P": 0.16
    };
    var CANONICAL_RESOLUTIONS = new Set(exports.H3_MULTI_ANGLE_RESOLUTIONS);
    function normalizeH3MultiAngleResolution(raw) {
      if (raw === void 0 || raw === null || raw === "") {
        return exports.H3_MULTI_ANGLE_DEFAULT_RESOLUTION;
      }
      const key = String(raw).trim();
      if (CANONICAL_RESOLUTIONS.has(key))
        return key;
      return exports.H3_MULTI_ANGLE_RESOLUTIONS[0];
    }
    function normalizeH3MultiAngleDuration(raw) {
      if (raw === void 0 || raw === null || raw === "" || raw === "auto") {
        return exports.H3_MULTI_ANGLE_DEFAULT_DURATION;
      }
      const parsed = Number(raw);
      if (!Number.isFinite(parsed) || parsed <= 0)
        return exports.H3_MULTI_ANGLE_DEFAULT_DURATION;
      return Math.min(15, Math.max(5, Math.trunc(parsed)));
    }
    var clamp = (value, min, max) => Math.min(max, Math.max(min, value));
    var round = (value, digits) => {
      const factor = 10 ** digits;
      const scaled = value * factor;
      if (!Number.isFinite(scaled))
        return value;
      return Math.round(scaled) / factor;
    };
    var readNumber = (raw) => {
      if (raw === void 0 || raw === null || raw === "")
        return void 0;
      const parsed = typeof raw === "number" ? raw : Number(raw);
      return Number.isFinite(parsed) ? parsed : void 0;
    };
    function normalizeH3CameraTrajectory(raw) {
      if (!Array.isArray(raw))
        return void 0;
      const parsed = [];
      for (const entry of raw) {
        if (!entry || typeof entry !== "object" || Array.isArray(entry))
          continue;
        const source = entry;
        const time = readNumber(source.time);
        const azimuth = readNumber(source.azimuth);
        const elevation = readNumber(source.elevation);
        const distance = readNumber(source.distance);
        if (time === void 0 || azimuth === void 0 || elevation === void 0 || distance === void 0) {
          continue;
        }
        parsed.push({
          time: round(clamp(time, 0, 1), 4),
          azimuth: round(azimuth, 2),
          elevation: round(clamp(elevation, -90, 90), 2),
          distance: round(clamp(distance, exports.H3_MULTI_ANGLE_MIN_DISTANCE, exports.H3_MULTI_ANGLE_MAX_DISTANCE), 4)
        });
      }
      if (parsed.length < exports.H3_MULTI_ANGLE_MIN_KEYFRAMES)
        return void 0;
      const ordered = parsed.map((keyframe, index) => ({ keyframe, index })).sort((a, b) => a.keyframe.time - b.keyframe.time || a.index - b.index).map((item) => item.keyframe);
      const deduped = [];
      for (const keyframe of ordered) {
        const previous = deduped[deduped.length - 1];
        if (previous && previous.time === keyframe.time)
          continue;
        deduped.push(keyframe);
      }
      if (deduped.length < exports.H3_MULTI_ANGLE_MIN_KEYFRAMES) {
        if (ordered.length < exports.H3_MULTI_ANGLE_MIN_KEYFRAMES)
          return void 0;
        return capAzimuthTravel([
          { ...ordered[0], time: 0 },
          { ...ordered[ordered.length - 1], time: 1 }
        ]);
      }
      const capped = capKeyframeCount(deduped, exports.H3_MULTI_ANGLE_MAX_KEYFRAMES);
      return capAzimuthTravel(capped);
    }
    function capKeyframeCount(keyframes, max) {
      if (keyframes.length <= max)
        return keyframes;
      const kept = [];
      const step = (keyframes.length - 1) / (max - 1);
      for (let i = 0; i < max; i += 1) {
        kept.push(keyframes[Math.round(i * step)]);
      }
      return kept;
    }
    function capAzimuthTravel(keyframes) {
      let travel = 0;
      for (let i = 1; i < keyframes.length; i += 1) {
        travel += Math.abs(keyframes[i].azimuth - keyframes[i - 1].azimuth);
      }
      if (travel <= exports.H3_MULTI_ANGLE_MAX_AZIMUTH_TRAVEL)
        return keyframes;
      const margin = keyframes.length * 0.01;
      const target = Math.max(0, exports.H3_MULTI_ANGLE_MAX_AZIMUTH_TRAVEL - margin);
      const ratio = target / travel;
      const origin = keyframes[0].azimuth;
      return keyframes.map((keyframe, index) => index === 0 ? keyframe : { ...keyframe, azimuth: round(origin + (keyframe.azimuth - origin) * ratio, 2) });
    }
    function h3MultiAngleCreditCost(params) {
      const duration = normalizeH3MultiAngleDuration(params.duration);
      const resolution = normalizeH3MultiAngleResolution(params.resolution);
      return Math.round(USD_PER_SECOND[resolution] * 100) * duration;
    }
    var kf = (time, azimuth, elevation, distance) => ({ time, azimuth, elevation, distance });
    exports.H3_CAMERA_PRESETS = [
      {
        id: "dolly_in",
        label: "Travelling avant",
        anchors: [kf(0, 0, 0, 1), kf(1, 0, 0, 0.35)]
      },
      {
        id: "dolly_out",
        label: "Travelling arri\xE8re",
        anchors: [kf(0, 0, 0, 0.45), kf(1, 0, 0, 1.4)]
      },
      {
        id: "spiral_in",
        label: "Spirale avant",
        anchors: [kf(0, 0, 0, 1.15), kf(0.5, 95, 12, 0.75), kf(1, 180, 22, 0.4)]
      },
      {
        id: "crane_up",
        label: "Grue vers le haut",
        anchors: [kf(0, 0, -12, 1), kf(1, 0, 55, 0.95)]
      },
      {
        id: "orbit_360_right",
        label: "Orbite 360\xB0 \xE0 droite",
        anchors: [kf(0, 0, 0, 1), kf(0.5, 180, 0, 1), kf(1, 360, 0, 1)]
      },
      {
        id: "orbit_360_left",
        label: "Orbite 360\xB0 \xE0 gauche",
        anchors: [kf(0, 0, 0, 1), kf(0.5, -180, 0, 1), kf(1, -360, 0, 1)]
      },
      {
        id: "half_orbit_right",
        label: "Demi-orbite \xE0 droite",
        anchors: [kf(0, 0, 0, 1), kf(1, 180, 0, 1)]
      },
      {
        id: "half_orbit_left",
        label: "Demi-orbite \xE0 gauche",
        anchors: [kf(0, 0, 0, 1), kf(1, -180, 0, 1)]
      },
      {
        id: "high_orbit_right",
        label: "Orbite haute \xE0 droite",
        anchors: [kf(0, 0, 38, 1), kf(0.5, 180, 38, 1), kf(1, 360, 38, 1)]
      },
      {
        id: "low_orbit_right",
        label: "Orbite basse \xE0 droite",
        anchors: [kf(0, 0, -32, 1), kf(0.5, 180, -32, 1), kf(1, 360, -32, 1)]
      },
      {
        id: "orbit_360_spiral_in",
        label: "Orbite 360\xB0 en spirale",
        anchors: [kf(0, 0, 0, 1.25), kf(0.5, 180, 14, 0.8), kf(1, 360, 28, 0.42)]
      },
      {
        id: "swing",
        label: "Balancier",
        anchors: [kf(0, -45, 0, 1), kf(0.5, 45, 0, 1), kf(1, -45, 0, 1)]
      }
    ];
    var lerp = (from, to, ratio) => from + (to - from) * ratio;
    function interpolateH3CameraPose(anchors, time) {
      if (anchors.length === 0)
        return void 0;
      if (anchors.length === 1)
        return { ...anchors[0], time };
      if (time <= anchors[0].time)
        return { ...anchors[0], time };
      const last = anchors[anchors.length - 1];
      if (time >= last.time)
        return { ...last, time };
      let segment = 0;
      while (segment < anchors.length - 2 && time > anchors[segment + 1].time)
        segment += 1;
      const from = anchors[segment];
      const to = anchors[segment + 1];
      const span = to.time - from.time;
      const ratio = span <= 0 ? 0 : clamp((time - from.time) / span, 0, 1);
      return {
        time,
        azimuth: lerp(from.azimuth, to.azimuth, ratio),
        elevation: lerp(from.elevation, to.elevation, ratio),
        distance: lerp(from.distance, to.distance, ratio)
      };
    }
    function sampleH3CameraPreset(anchors, count) {
      const total = clamp(Math.trunc(count) || exports.H3_MULTI_ANGLE_MIN_KEYFRAMES, exports.H3_MULTI_ANGLE_MIN_KEYFRAMES, exports.H3_MULTI_ANGLE_MAX_KEYFRAMES);
      if (anchors.length === 0)
        return [];
      if (anchors.length === 1) {
        return Array.from({ length: total }, (_unused, index) => ({
          ...anchors[0],
          time: round(index / (total - 1), 4)
        }));
      }
      const sampled = [];
      for (let index = 0; index < total; index += 1) {
        const time = index / (total - 1);
        const pose = interpolateH3CameraPose(anchors, time);
        if (!pose)
          continue;
        sampled.push({
          time: round(time, 4),
          azimuth: round(pose.azimuth, 2),
          elevation: round(pose.elevation, 2),
          distance: round(pose.distance, 4)
        });
      }
      return sampled;
    }
    function defaultH3CameraTrajectory(count = 5) {
      const preset = exports.H3_CAMERA_PRESETS.find((entry) => entry.id === "half_orbit_right") ?? exports.H3_CAMERA_PRESETS[0];
      return sampleH3CameraPreset(preset.anchors, count);
    }
    var firstUrl = (value) => {
      if (typeof value === "string" && value.trim())
        return value.trim();
      if (Array.isArray(value)) {
        for (const entry of value) {
          const found = firstUrl(entry);
          if (found)
            return found;
        }
      }
      return void 0;
    };
    function buildH3MultiAngleFalRequest(params) {
      const { prompt, imageUrls, resolution, dynamicInputs = {} } = params;
      const imageUrl = firstUrl(dynamicInputs.start_image ?? dynamicInputs.image_url ?? dynamicInputs.image) ?? firstUrl(imageUrls);
      const input = {
        duration: normalizeH3MultiAngleDuration(dynamicInputs.duration),
        resolution: normalizeH3MultiAngleResolution(resolution ?? dynamicInputs.resolution),
        prompt_expansion_mode: dynamicInputs.prompt_expansion_mode === "quality" ? "quality" : "balanced"
      };
      const trimmedPrompt = (prompt ?? "").trim();
      if (trimmedPrompt)
        input.prompt = trimmedPrompt;
      if (imageUrl)
        input.image_url = imageUrl;
      const trajectory = normalizeH3CameraTrajectory(dynamicInputs.camera_trajectory ?? dynamicInputs.cameraTrajectory);
      if (trajectory)
        input.camera_trajectory = trajectory;
      const seed = readNumber(dynamicInputs.seed);
      if (seed !== void 0)
        input.seed = seed;
      if (typeof dynamicInputs.enable_safety_checker === "boolean") {
        input.enable_safety_checker = dynamicInputs.enable_safety_checker;
      }
      return { falModelId: exports.H3_MULTI_ANGLE_ENDPOINT, input };
    }
  }
});

// ../packages/workflow-contracts/dist/wan30.js
var require_wan30 = __commonJS({
  "../packages/workflow-contracts/dist/wan30.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WAN30_MAX_REFERENCE_VIDEO_SECONDS = exports.WAN30_SEED_MAX = exports.WAN30_MAX_REF_AUDIOS = exports.WAN30_MAX_REF_VIDEOS = exports.WAN30_MAX_REF_IMAGES = exports.WAN30_DEFAULT_ASPECT = exports.WAN30_DEFAULT_DURATION = exports.WAN30_DEFAULT_RESOLUTION = exports.WAN30_ENDPOINTS = exports.WAN30_DURATIONS = exports.WAN30_ASPECTS = exports.WAN30_RESOLUTIONS = void 0;
    exports.normalizeWan30Resolution = normalizeWan30Resolution;
    exports.normalizeWan30Duration = normalizeWan30Duration;
    exports.normalizeWan30AspectRatio = normalizeWan30AspectRatio;
    exports.wan30CreditCost = wan30CreditCost;
    exports.buildWan30FalRequest = buildWan30FalRequest;
    exports.WAN30_RESOLUTIONS = ["1080p", "720p", "480p"];
    exports.WAN30_ASPECTS = ["adaptive", "16:9", "4:3", "1:1", "3:4", "9:16"];
    exports.WAN30_DURATIONS = Array.from({ length: 29 }, (_, i) => i + 2);
    exports.WAN30_ENDPOINTS = {
      standard: {
        t2v: "alibaba/wan-3.0/text-to-video",
        i2v: "alibaba/wan-3.0/image-to-video",
        r2v: "alibaba/wan-3.0/reference-to-video"
      },
      prime: {
        t2v: "alibaba/wan-3.0-prime/text-to-video",
        i2v: "alibaba/wan-3.0-prime/image-to-video",
        r2v: "alibaba/wan-3.0-prime/reference-to-video"
      }
    };
    exports.WAN30_DEFAULT_RESOLUTION = "1080p";
    exports.WAN30_DEFAULT_DURATION = 5;
    exports.WAN30_DEFAULT_ASPECT = "adaptive";
    exports.WAN30_MAX_REF_IMAGES = 10;
    exports.WAN30_MAX_REF_VIDEOS = 5;
    exports.WAN30_MAX_REF_AUDIOS = 5;
    exports.WAN30_SEED_MAX = 2147483647;
    var CREDITS_PER_SECOND = {
      standard: { "480p": 5, "720p": 10, "1080p": 20 },
      prime: { "480p": 6.8, "720p": 14, "1080p": 28 }
    };
    var RESOLUTION_ALIASES = {
      "480p": "480p",
      "480P": "480p",
      "720p": "720p",
      "720P": "720p",
      "1080p": "1080p",
      "1080P": "1080p",
      "1k": "1080p",
      "1K": "1080p",
      "2k": "1080p",
      "2K": "1080p",
      "4k": "1080p",
      "4K": "1080p",
      "768p": "720p",
      "768P": "720p",
      "1440p": "1080p",
      "2160p": "1080p"
    };
    var ASPECT_SET = new Set(exports.WAN30_ASPECTS);
    var toUrlArray = (value, limit) => {
      if (!value)
        return [];
      const collected = [];
      const push = (v) => {
        if (typeof v === "string" && v.trim())
          collected.push(v.trim());
        else if (Array.isArray(v))
          v.forEach(push);
      };
      push(value);
      return Array.from(new Set(collected)).slice(0, limit);
    };
    var firstUrl = (value) => toUrlArray(value, 1)[0];
    var isUrlLike = (value) => {
      if (typeof value === "boolean")
        return false;
      if (typeof value === "number")
        return false;
      if (typeof value === "string") {
        const trimmed = value.trim();
        if (!trimmed || trimmed === "true" || trimmed === "false")
          return false;
        return true;
      }
      return Array.isArray(value);
    };
    function normalizeWan30Resolution(raw) {
      if (raw === void 0 || raw === null || raw === "")
        return exports.WAN30_DEFAULT_RESOLUTION;
      const key = String(raw).trim();
      if (RESOLUTION_ALIASES[key])
        return RESOLUTION_ALIASES[key];
      const lower = key.toLowerCase();
      if (RESOLUTION_ALIASES[lower])
        return RESOLUTION_ALIASES[lower];
      return exports.WAN30_DEFAULT_RESOLUTION;
    }
    function normalizeWan30Duration(raw) {
      if (raw === void 0 || raw === null || raw === "" || raw === "auto") {
        return exports.WAN30_DEFAULT_DURATION;
      }
      const parsed = Number(raw);
      if (!Number.isFinite(parsed) || parsed <= 0)
        return exports.WAN30_DEFAULT_DURATION;
      return Math.min(30, Math.max(2, Math.trunc(parsed)));
    }
    function normalizeWan30AspectRatio(aspectRatio) {
      const raw = (aspectRatio ?? "").toString().trim();
      if (!raw || raw === "auto")
        return exports.WAN30_DEFAULT_ASPECT;
      return ASPECT_SET.has(raw) ? raw : exports.WAN30_DEFAULT_ASPECT;
    }
    var USD_PER_SECOND = {
      standard: { "480p": 0.05, "720p": 0.1, "1080p": 0.2 },
      prime: { "480p": 0.068, "720p": 0.14, "1080p": 0.28 }
    };
    exports.WAN30_MAX_REFERENCE_VIDEO_SECONDS = 15;
    function wan30CreditCost(tier, resolution, duration, referenceVideoSeconds = 0) {
      const res = normalizeWan30Resolution(resolution);
      const dur = normalizeWan30Duration(duration);
      const legacy = Math.round(CREDITS_PER_SECOND[tier][res] * dur * 100) / 100;
      const refSeconds = Number.isFinite(referenceVideoSeconds) ? Math.max(0, referenceVideoSeconds) : 0;
      const usd = USD_PER_SECOND[tier][res] * (dur + refSeconds);
      return Math.max(legacy, Math.ceil(Math.round(usd * 100 * 1e6) / 1e6));
    }
    function resolveI2vFrames(params) {
      const { imageUrls = [], dynamicInputs = {} } = params;
      const positional = imageUrls.map((url) => typeof url === "string" ? url.trim() : "").filter((url) => url.length > 0);
      const namedStart = firstUrl(dynamicInputs.start_image ?? dynamicInputs.start_image_url ?? dynamicInputs.image_url);
      const namedEnd = firstUrl(dynamicInputs.end_image ?? dynamicInputs.end_image_url);
      const start = namedStart ?? positional[0];
      if (!start)
        return {};
      const end = namedEnd ?? positional.find((url) => url !== start);
      return { start, end: end === start ? void 0 : end };
    }
    function collectR2vMedia(params) {
      const { dynamicInputs = {} } = params;
      const images = toUrlArray([
        dynamicInputs.reference_image_urls,
        dynamicInputs.reference_images,
        dynamicInputs.reference_image,
        dynamicInputs.reference_image_url
      ], exports.WAN30_MAX_REF_IMAGES);
      const videos = toUrlArray([
        dynamicInputs.reference_video_urls,
        dynamicInputs.reference_videos,
        dynamicInputs.reference_video,
        dynamicInputs.reference_video_url,
        dynamicInputs.video_urls,
        dynamicInputs.video_url,
        dynamicInputs.video
      ], exports.WAN30_MAX_REF_VIDEOS);
      const audioSources = [
        dynamicInputs.reference_audio_urls,
        dynamicInputs.reference_audios,
        dynamicInputs.reference_audio,
        dynamicInputs.reference_audio_url,
        isUrlLike(dynamicInputs.audio_urls) ? dynamicInputs.audio_urls : void 0,
        isUrlLike(dynamicInputs.audio_url) ? dynamicInputs.audio_url : void 0
      ];
      const audios = toUrlArray(audioSources, exports.WAN30_MAX_REF_AUDIOS);
      return { images, videos, audios };
    }
    function optionalSeed(dynamicInputs) {
      const raw = dynamicInputs.seed;
      if (raw === void 0 || raw === null || raw === "")
        return void 0;
      const seed = Number(raw);
      if (!Number.isFinite(seed))
        return void 0;
      const trunc = Math.trunc(seed);
      if (trunc < 0 || trunc > exports.WAN30_SEED_MAX)
        return void 0;
      return trunc;
    }
    function resolveAudioFlag(dynamicInputs) {
      const raw = dynamicInputs.audio;
      if (raw === void 0 || raw === null || raw === "")
        return true;
      if (typeof raw === "boolean")
        return raw;
      if (raw === "false" || raw === "0")
        return false;
      if (raw === "true" || raw === "1")
        return true;
      return true;
    }
    function buildWan30FalRequest(params) {
      const { tier, prompt, imageUrls = [], resolution, aspectRatio, dynamicInputs = {} } = params;
      const endpoints = exports.WAN30_ENDPOINTS[tier];
      const refs = collectR2vMedia({ imageUrls, dynamicInputs });
      const frames = resolveI2vFrames({ imageUrls, dynamicInputs });
      const common = {
        prompt,
        duration: normalizeWan30Duration(dynamicInputs.duration),
        resolution: normalizeWan30Resolution(resolution ?? dynamicInputs.resolution),
        aspect_ratio: normalizeWan30AspectRatio(aspectRatio ?? (typeof dynamicInputs.aspect_ratio === "string" ? dynamicInputs.aspect_ratio : null)),
        audio: resolveAudioFlag(dynamicInputs)
      };
      const seed = optionalSeed(dynamicInputs);
      if (seed !== void 0)
        common.seed = seed;
      if (typeof dynamicInputs.enable_prompt_expansion === "boolean") {
        common.enable_prompt_expansion = dynamicInputs.enable_prompt_expansion;
      }
      if (dynamicInputs.enable_thinking === true) {
        common.enable_thinking = true;
      }
      if (typeof dynamicInputs.enable_safety_checker === "boolean") {
        common.enable_safety_checker = dynamicInputs.enable_safety_checker;
      }
      if (refs.images.length > 0 || refs.videos.length > 0 || refs.audios.length > 0) {
        const images = Array.from(new Set([frames.start, frames.end, ...refs.images].filter((u) => Boolean(u)))).slice(0, exports.WAN30_MAX_REF_IMAGES);
        return {
          falModelId: endpoints.r2v,
          input: {
            ...common,
            ...images.length > 0 ? { reference_image_urls: images } : {},
            ...refs.videos.length > 0 ? { reference_video_urls: refs.videos } : {},
            ...refs.audios.length > 0 ? { reference_audio_urls: refs.audios } : {}
          }
        };
      }
      if (frames.start) {
        return {
          falModelId: endpoints.i2v,
          input: {
            ...common,
            start_image_url: frames.start,
            ...frames.end ? { end_image_url: frames.end } : {}
          }
        };
      }
      return {
        falModelId: endpoints.t2v,
        input: { ...common }
      };
    }
  }
});

// ../packages/workflow-contracts/dist/seedance25.js
var require_seedance25 = __commonJS({
  "../packages/workflow-contracts/dist/seedance25.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SEEDANCE25_MAX_DURATION = exports.SEEDANCE25_MAX_INPUT_VIDEO_SECONDS = exports.SEEDANCE25_USD_PER_SECOND = exports.SEEDANCE25_MAX_REF_FILES = exports.SEEDANCE25_MAX_REF_AUDIOS = exports.SEEDANCE25_MAX_REF_VIDEOS = exports.SEEDANCE25_MAX_REF_IMAGES = exports.SEEDANCE25_DEFAULT_ASPECT = exports.SEEDANCE25_DEFAULT_DURATION = exports.SEEDANCE25_DEFAULT_RESOLUTION = exports.SEEDANCE25_ENDPOINTS = exports.SEEDANCE25_DURATIONS = exports.SEEDANCE25_ASPECTS = exports.SEEDANCE25_RESOLUTIONS = void 0;
    exports.normalizeSeedance25Resolution = normalizeSeedance25Resolution;
    exports.normalizeSeedance25Duration = normalizeSeedance25Duration;
    exports.seedance25SentDuration = seedance25SentDuration;
    exports.normalizeSeedance25AspectRatio = normalizeSeedance25AspectRatio;
    exports.hasSeedance25VideoInput = hasSeedance25VideoInput;
    exports.seedance25KieAspectRatio = seedance25KieAspectRatio;
    exports.seedance25CreditCost = seedance25CreditCost;
    exports.buildSeedance25FalRequest = buildSeedance25FalRequest;
    exports.buildSeedance25KieInput = buildSeedance25KieInput;
    exports.SEEDANCE25_RESOLUTIONS = ["720p", "480p", "1080p"];
    exports.SEEDANCE25_ASPECTS = ["auto", "21:9", "16:9", "4:3", "1:1", "3:4", "9:16"];
    exports.SEEDANCE25_DURATIONS = Array.from({ length: 27 }, (_, i) => i + 4);
    exports.SEEDANCE25_ENDPOINTS = {
      t2v: "bytedance/seedance-2.5/text-to-video",
      i2v: "bytedance/seedance-2.5/image-to-video",
      r2v: "bytedance/seedance-2.5/reference-to-video"
    };
    exports.SEEDANCE25_DEFAULT_RESOLUTION = "720p";
    exports.SEEDANCE25_DEFAULT_DURATION = 5;
    exports.SEEDANCE25_DEFAULT_ASPECT = "auto";
    exports.SEEDANCE25_MAX_REF_IMAGES = 30;
    exports.SEEDANCE25_MAX_REF_VIDEOS = 10;
    exports.SEEDANCE25_MAX_REF_AUDIOS = 10;
    exports.SEEDANCE25_MAX_REF_FILES = 50;
    var HIGGSFIELD_VIDEO_DIMS = {
      "480p": { width: 854, height: 480 },
      "720p": { width: 1280, height: 720 },
      // Higgsfield Open ne sert pas 1080p : un ancien nœud est borné au palier 720p.
      "1080p": { width: 1280, height: 720 }
    };
    var HIGGSFIELD_STANDARD_USD_PER_1000_TOKENS = 0.0214;
    var HIGGSFIELD_VIDEO_INPUT_RATE_MULTIPLIER = 0.6;
    var HIGGSFIELD_SEEDANCE_DISCOUNT_MULTIPLIER = 0.7;
    var KIE_ASPECT_SET = /* @__PURE__ */ new Set(["1:1", "4:3", "3:4", "16:9", "9:16", "21:9", "adaptive"]);
    var RESOLUTION_ALIASES = {
      "480p": "480p",
      "480P": "480p",
      "720p": "720p",
      "720P": "720p",
      "1080p": "1080p",
      "1080P": "1080p",
      "1k": "1080p",
      "1K": "1080p",
      "2k": "1080p",
      "2K": "1080p",
      "4k": "1080p",
      "4K": "1080p",
      "768p": "720p",
      "768P": "720p",
      "1440p": "1080p",
      "2160p": "1080p"
    };
    var ASPECT_SET = new Set(exports.SEEDANCE25_ASPECTS);
    var toUrlArray = (value, limit) => {
      if (!value)
        return [];
      const collected = [];
      const push = (v) => {
        if (typeof v === "string" && v.trim())
          collected.push(v.trim());
        else if (Array.isArray(v))
          v.forEach(push);
      };
      push(value);
      return Array.from(new Set(collected)).slice(0, limit);
    };
    var firstUrl = (value) => toUrlArray(value, 1)[0];
    var isUrlLike = (value) => {
      if (typeof value === "boolean" || typeof value === "number")
        return false;
      if (typeof value === "string") {
        const trimmed = value.trim();
        return Boolean(trimmed) && trimmed !== "true" && trimmed !== "false";
      }
      return Array.isArray(value);
    };
    function normalizeSeedance25Resolution(raw) {
      if (raw === void 0 || raw === null || raw === "")
        return exports.SEEDANCE25_DEFAULT_RESOLUTION;
      const key = String(raw).trim();
      return RESOLUTION_ALIASES[key] ?? RESOLUTION_ALIASES[key.toLowerCase()] ?? exports.SEEDANCE25_DEFAULT_RESOLUTION;
    }
    function normalizeSeedance25Duration(raw) {
      if (raw === void 0 || raw === null || raw === "" || raw === "auto")
        return exports.SEEDANCE25_DEFAULT_DURATION;
      const parsed = Number(raw);
      if (!Number.isFinite(parsed) || parsed <= 0)
        return exports.SEEDANCE25_DEFAULT_DURATION;
      return Math.min(30, Math.max(4, Math.trunc(parsed)));
    }
    function seedance25SentDuration(raw) {
      return String(normalizeSeedance25Duration(raw));
    }
    function normalizeSeedance25AspectRatio(aspectRatio) {
      const raw = (aspectRatio ?? "").toString().trim();
      if (!raw)
        return exports.SEEDANCE25_DEFAULT_ASPECT;
      return ASPECT_SET.has(raw) ? raw : exports.SEEDANCE25_DEFAULT_ASPECT;
    }
    function hasSeedance25VideoInput(inputs = {}) {
      return toUrlArray([
        inputs.video_urls,
        inputs.video_url,
        inputs.video,
        inputs.reference_video_urls,
        inputs.reference_videos,
        inputs.reference_video,
        inputs.reference_video_url
      ], exports.SEEDANCE25_MAX_REF_VIDEOS).length > 0;
    }
    function seedance25KieAspectRatio(aspectRatio) {
      const raw = (aspectRatio ?? "").toString().trim();
      if (!raw || raw === "auto" || !KIE_ASPECT_SET.has(raw))
        return "adaptive";
      return raw;
    }
    exports.SEEDANCE25_USD_PER_SECOND = {
      "480p": 0.2205,
      "720p": 0.473,
      "1080p": 1.164
    };
    exports.SEEDANCE25_MAX_INPUT_VIDEO_SECONDS = 30.2;
    exports.SEEDANCE25_MAX_DURATION = 30;
    function seedance25LegacyCreditCost(params) {
      const resolution = normalizeSeedance25Resolution(params.resolution);
      const video = params.hasVideoInput ?? hasSeedance25VideoInput(params.dynamicInputs ?? {});
      const parsedInputDuration = Number(params.dynamicInputs?.input_video_duration);
      const hasMeasuredInputDuration = Number.isFinite(parsedInputDuration) && parsedInputDuration > 0;
      const hasExplicitOutputDuration = params.duration !== void 0 && params.duration !== null && params.duration !== "";
      const duration = video && !hasExplicitOutputDuration && hasMeasuredInputDuration ? parsedInputDuration : normalizeSeedance25Duration(params.duration);
      const inputDuration = video ? hasMeasuredInputDuration ? parsedInputDuration : duration : 0;
      const dims = HIGGSFIELD_VIDEO_DIMS[resolution];
      const tokens = Math.ceil((duration + inputDuration) * dims.width * dims.height * 24 / 1024);
      const usdPerThousand = HIGGSFIELD_STANDARD_USD_PER_1000_TOKENS * HIGGSFIELD_SEEDANCE_DISCOUNT_MULTIPLIER * (video ? HIGGSFIELD_VIDEO_INPUT_RATE_MULTIPLIER : 1);
      return Math.ceil(tokens * usdPerThousand / 1e3 * 100 * 100) / 100;
    }
    function seedance25CreditCost(params) {
      const resolution = normalizeSeedance25Resolution(params.resolution);
      const video = params.hasVideoInput ?? hasSeedance25VideoInput(params.dynamicInputs ?? {});
      const measured = typeof params.inputVideoDuration === "number" && Number.isFinite(params.inputVideoDuration) && params.inputVideoDuration >= 0 ? params.inputVideoDuration : void 0;
      const inputSeconds = video ? measured ?? exports.SEEDANCE25_MAX_INPUT_VIDEO_SECONDS : 0;
      let outputSeconds = params.durationLeftToModel ? exports.SEEDANCE25_MAX_DURATION : normalizeSeedance25Duration(params.duration);
      if (video && params.outputFollowsSource) {
        outputSeconds = Math.max(outputSeconds, Math.min(exports.SEEDANCE25_MAX_DURATION, measured ?? exports.SEEDANCE25_MAX_DURATION));
      }
      const usd = exports.SEEDANCE25_USD_PER_SECOND[resolution] * (video ? (inputSeconds + outputSeconds) * HIGGSFIELD_VIDEO_INPUT_RATE_MULTIPLIER : outputSeconds);
      const credits = Math.ceil(Math.round(usd * 100 * 1e6) / 1e6);
      return Math.max(seedance25LegacyCreditCost(params), credits);
    }
    function resolveI2vFrames(params) {
      const { imageUrls = [], dynamicInputs = {} } = params;
      const positional = imageUrls.map((url) => typeof url === "string" ? url.trim() : "").filter((url) => url.length > 0);
      const namedStart = firstUrl(dynamicInputs.start_image ?? dynamicInputs.start_image_url ?? dynamicInputs.image_url);
      const namedEnd = firstUrl(dynamicInputs.end_image ?? dynamicInputs.end_image_url);
      const start = namedStart ?? positional[0];
      if (!start)
        return {};
      const end = namedEnd ?? positional.find((url) => url !== start);
      return { start, end: end === start ? void 0 : end };
    }
    function collectR2vMedia(params) {
      const { dynamicInputs = {} } = params;
      const images = toUrlArray([
        dynamicInputs.reference_image_urls,
        dynamicInputs.reference_images,
        dynamicInputs.reference_image,
        dynamicInputs.reference_image_url,
        dynamicInputs.image_urls
      ], exports.SEEDANCE25_MAX_REF_IMAGES);
      const videos = toUrlArray([
        dynamicInputs.reference_video_urls,
        dynamicInputs.reference_videos,
        dynamicInputs.reference_video,
        dynamicInputs.reference_video_url,
        dynamicInputs.video_urls,
        isUrlLike(dynamicInputs.video_url) ? dynamicInputs.video_url : void 0,
        isUrlLike(dynamicInputs.video) ? dynamicInputs.video : void 0
      ], exports.SEEDANCE25_MAX_REF_VIDEOS);
      const audios = toUrlArray([
        dynamicInputs.reference_audio_urls,
        dynamicInputs.reference_audios,
        dynamicInputs.reference_audio,
        dynamicInputs.reference_audio_url,
        dynamicInputs.audio_urls,
        isUrlLike(dynamicInputs.audio_url) ? dynamicInputs.audio_url : void 0
      ], exports.SEEDANCE25_MAX_REF_AUDIOS);
      const keptImages = images.slice();
      const keptVideos = videos.slice();
      const keptAudios = audios.slice();
      while (keptImages.length + keptVideos.length + keptAudios.length > exports.SEEDANCE25_MAX_REF_FILES) {
        if (keptAudios.length > 0)
          keptAudios.pop();
        else if (keptVideos.length > 0)
          keptVideos.pop();
        else
          keptImages.pop();
      }
      return { images: keptImages, videos: keptVideos, audios: keptAudios };
    }
    function resolveGenerateAudio(dynamicInputs) {
      const raw = dynamicInputs.generate_audio;
      if (raw === void 0 || raw === null || raw === "")
        return true;
      if (typeof raw === "boolean")
        return raw;
      if (raw === "false" || raw === "0")
        return false;
      return true;
    }
    function resolveBitrateMode(dynamicInputs) {
      const raw = dynamicInputs.bitrate_mode;
      if (raw === "high" || raw === "standard")
        return raw;
      return void 0;
    }
    function buildSeedance25FalRequest(params) {
      const { prompt, imageUrls = [], resolution, aspectRatio, dynamicInputs = {} } = params;
      const refs = collectR2vMedia({ imageUrls, dynamicInputs });
      const frames = resolveI2vFrames({ imageUrls, dynamicInputs });
      const duration = seedance25SentDuration(dynamicInputs.duration);
      const common = {
        prompt,
        duration,
        resolution: normalizeSeedance25Resolution(resolution ?? dynamicInputs.resolution),
        generate_audio: resolveGenerateAudio(dynamicInputs)
      };
      const bitrate = resolveBitrateMode(dynamicInputs);
      if (bitrate)
        common.bitrate_mode = bitrate;
      if (refs.images.length > 0 || refs.videos.length > 0 || refs.audios.length > 0) {
        if (refs.audios.length > 0 && refs.images.length === 0 && refs.videos.length === 0) {
          throw new Error("Seedance 2.5 : un audio de r\xE9f\xE9rence n\xE9cessite au moins une image ou vid\xE9o de r\xE9f\xE9rence.");
        }
        const images = Array.from(new Set([frames.start, frames.end, ...refs.images].filter((u) => Boolean(u)))).slice(0, exports.SEEDANCE25_MAX_REF_IMAGES);
        return {
          falModelId: exports.SEEDANCE25_ENDPOINTS.r2v,
          input: {
            ...common,
            aspect_ratio: normalizeSeedance25AspectRatio(aspectRatio ?? (typeof dynamicInputs.aspect_ratio === "string" ? dynamicInputs.aspect_ratio : null)),
            ...images.length > 0 ? { image_urls: images } : {},
            ...refs.videos.length > 0 ? { video_urls: refs.videos } : {},
            ...refs.audios.length > 0 ? { audio_urls: refs.audios } : {}
          }
        };
      }
      if (frames.start) {
        return {
          falModelId: exports.SEEDANCE25_ENDPOINTS.i2v,
          input: { ...common, image_url: frames.start, ...frames.end ? { end_image_url: frames.end } : {}, aspect_ratio: "auto" }
        };
      }
      return {
        falModelId: exports.SEEDANCE25_ENDPOINTS.t2v,
        input: {
          ...common,
          aspect_ratio: normalizeSeedance25AspectRatio(aspectRatio ?? (typeof dynamicInputs.aspect_ratio === "string" ? dynamicInputs.aspect_ratio : null))
        }
      };
    }
    function buildSeedance25KieInput(params) {
      const { prompt, imageUrls = [], resolution, aspectRatio, dynamicInputs = {} } = params;
      const refs = collectR2vMedia({ imageUrls, dynamicInputs });
      const frames = resolveI2vFrames({ imageUrls, dynamicInputs });
      const common = {
        prompt: (prompt ?? "").slice(0, 3e4),
        duration: normalizeSeedance25Duration(dynamicInputs.duration),
        resolution: normalizeSeedance25Resolution(resolution ?? dynamicInputs.resolution),
        generate_audio: resolveGenerateAudio(dynamicInputs)
      };
      if (refs.images.length > 0 || refs.videos.length > 0 || refs.audios.length > 0) {
        if (refs.audios.length > 0 && refs.images.length === 0 && refs.videos.length === 0) {
          throw new Error("Seedance 2.5 : un audio de r\xE9f\xE9rence n\xE9cessite au moins une image ou vid\xE9o de r\xE9f\xE9rence.");
        }
        const images = Array.from(new Set([frames.start, frames.end, ...refs.images].filter((u) => Boolean(u)))).slice(0, exports.SEEDANCE25_MAX_REF_IMAGES);
        return {
          ...common,
          aspect_ratio: seedance25KieAspectRatio(aspectRatio ?? (typeof dynamicInputs.aspect_ratio === "string" ? dynamicInputs.aspect_ratio : null)),
          ...images.length > 0 ? { reference_image_urls: images } : {},
          ...refs.videos.length > 0 ? { reference_video_urls: refs.videos } : {},
          ...refs.audios.length > 0 ? { reference_audio_urls: refs.audios } : {}
        };
      }
      if (frames.start) {
        return {
          ...common,
          first_frame_url: frames.start,
          ...frames.end ? { last_frame_url: frames.end } : {},
          aspect_ratio: "adaptive"
        };
      }
      return {
        ...common,
        aspect_ratio: seedance25KieAspectRatio(aspectRatio ?? (typeof dynamicInputs.aspect_ratio === "string" ? dynamicInputs.aspect_ratio : null))
      };
    }
  }
});

// ../packages/workflow-contracts/dist/klingV3Turbo.js
var require_klingV3Turbo = __commonJS({
  "../packages/workflow-contracts/dist/klingV3Turbo.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.KLING_V3_TURBO_MILLI_USD_PER_SECOND = exports.KLING_V3_TURBO_ALL_ENDPOINTS = exports.KLING_V3_TURBO_ENDPOINTS = exports.KLING_V3_TURBO_MAX_PROMPT_LENGTH = exports.KLING_V3_TURBO_DEFAULT_ASPECT = exports.KLING_V3_TURBO_ASPECTS = exports.KLING_V3_TURBO_DURATIONS = exports.KLING_V3_TURBO_DEFAULT_DURATION = exports.KLING_V3_TURBO_MAX_DURATION = exports.KLING_V3_TURBO_MIN_DURATION = exports.KLING_V3_TURBO_DEFAULT_TIER = exports.KLING_V3_TURBO_RESOLUTIONS = void 0;
    exports.normalizeKlingV3TurboTier = normalizeKlingV3TurboTier;
    exports.klingV3TurboResolutionLabel = klingV3TurboResolutionLabel;
    exports.isKlingV3TurboEndpoint = isKlingV3TurboEndpoint;
    exports.klingV3TurboTierFromEndpoint = klingV3TurboTierFromEndpoint;
    exports.klingV3TurboKindFromEndpoint = klingV3TurboKindFromEndpoint;
    exports.normalizeKlingV3TurboDuration = normalizeKlingV3TurboDuration;
    exports.klingV3TurboSentDuration = klingV3TurboSentDuration;
    exports.normalizeKlingV3TurboAspectRatio = normalizeKlingV3TurboAspectRatio;
    exports.klingV3TurboMultiPromptSeconds = klingV3TurboMultiPromptSeconds;
    exports.klingV3TurboBillableSeconds = klingV3TurboBillableSeconds;
    exports.klingV3TurboCreditCost = klingV3TurboCreditCost;
    exports.klingV3TurboCreditCostFromInputs = klingV3TurboCreditCostFromInputs;
    exports.buildKlingV3TurboFalRequest = buildKlingV3TurboFalRequest;
    exports.hardenKlingV3TurboProxyInput = hardenKlingV3TurboProxyInput;
    exports.KLING_V3_TURBO_RESOLUTIONS = ["Standard", "Pro"];
    exports.KLING_V3_TURBO_DEFAULT_TIER = "standard";
    exports.KLING_V3_TURBO_MIN_DURATION = 3;
    exports.KLING_V3_TURBO_MAX_DURATION = 15;
    exports.KLING_V3_TURBO_DEFAULT_DURATION = 5;
    exports.KLING_V3_TURBO_DURATIONS = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    exports.KLING_V3_TURBO_ASPECTS = ["16:9", "9:16", "1:1"];
    exports.KLING_V3_TURBO_DEFAULT_ASPECT = "16:9";
    exports.KLING_V3_TURBO_MAX_PROMPT_LENGTH = 2500;
    exports.KLING_V3_TURBO_ENDPOINTS = {
      standard: {
        t2v: "fal-ai/kling-video/v3/turbo/standard/text-to-video",
        i2v: "fal-ai/kling-video/v3/turbo/standard/image-to-video"
      },
      pro: {
        t2v: "fal-ai/kling-video/v3/turbo/pro/text-to-video",
        i2v: "fal-ai/kling-video/v3/turbo/pro/image-to-video"
      }
    };
    exports.KLING_V3_TURBO_ALL_ENDPOINTS = [
      exports.KLING_V3_TURBO_ENDPOINTS.standard.t2v,
      exports.KLING_V3_TURBO_ENDPOINTS.standard.i2v,
      exports.KLING_V3_TURBO_ENDPOINTS.pro.t2v,
      exports.KLING_V3_TURBO_ENDPOINTS.pro.i2v
    ];
    exports.KLING_V3_TURBO_MILLI_USD_PER_SECOND = {
      standard: 112,
      pro: 140
    };
    var ASPECT_SET = new Set(exports.KLING_V3_TURBO_ASPECTS);
    var toUrlArray = (value) => {
      const collected = [];
      const push = (v) => {
        if (typeof v === "string" && v.trim())
          collected.push(v.trim());
        else if (Array.isArray(v))
          v.forEach(push);
      };
      push(value);
      return Array.from(new Set(collected));
    };
    function normalizeKlingV3TurboTier(raw) {
      if (typeof raw !== "string")
        return exports.KLING_V3_TURBO_DEFAULT_TIER;
      const value = raw.trim().toLowerCase();
      return value === "pro" ? "pro" : exports.KLING_V3_TURBO_DEFAULT_TIER;
    }
    function klingV3TurboResolutionLabel(tier) {
      return tier === "pro" ? "Pro" : "Standard";
    }
    function isKlingV3TurboEndpoint(falModelId) {
      return typeof falModelId === "string" && exports.KLING_V3_TURBO_ALL_ENDPOINTS.includes(falModelId);
    }
    function klingV3TurboTierFromEndpoint(falModelId) {
      if (!isKlingV3TurboEndpoint(falModelId))
        return void 0;
      return falModelId.includes("/turbo/pro/") ? "pro" : "standard";
    }
    function klingV3TurboKindFromEndpoint(falModelId) {
      if (!isKlingV3TurboEndpoint(falModelId))
        return void 0;
      return falModelId.endsWith("/image-to-video") ? "i2v" : "t2v";
    }
    function normalizeKlingV3TurboDuration(raw) {
      if (raw === void 0 || raw === null || raw === "" || raw === "auto") {
        return exports.KLING_V3_TURBO_DEFAULT_DURATION;
      }
      const parsed = Number(raw);
      if (!Number.isFinite(parsed) || parsed <= 0)
        return exports.KLING_V3_TURBO_DEFAULT_DURATION;
      return Math.min(exports.KLING_V3_TURBO_MAX_DURATION, Math.max(exports.KLING_V3_TURBO_MIN_DURATION, Math.trunc(parsed)));
    }
    function klingV3TurboSentDuration(raw) {
      return String(normalizeKlingV3TurboDuration(raw));
    }
    function normalizeKlingV3TurboAspectRatio(raw) {
      const value = typeof raw === "string" ? raw.trim() : "";
      return ASPECT_SET.has(value) ? value : exports.KLING_V3_TURBO_DEFAULT_ASPECT;
    }
    function klingV3TurboMultiPromptSeconds(multiPrompt) {
      if (!Array.isArray(multiPrompt) || multiPrompt.length === 0)
        return 0;
      let total = 0;
      for (const shot of multiPrompt) {
        const seconds = Number(shot?.duration);
        if (!Number.isFinite(seconds) || seconds <= 0)
          return exports.KLING_V3_TURBO_MAX_DURATION;
        total += seconds;
      }
      return Math.min(exports.KLING_V3_TURBO_MAX_DURATION, Math.max(exports.KLING_V3_TURBO_MIN_DURATION, Math.ceil(total)));
    }
    function klingV3TurboBillableSeconds(params) {
      return Math.max(normalizeKlingV3TurboDuration(params.duration), klingV3TurboMultiPromptSeconds(params.multiPrompt));
    }
    function klingV3TurboCreditCost(params) {
      const fromSlug = klingV3TurboTierFromEndpoint(params.falModelId);
      const fromResolution = normalizeKlingV3TurboTier(params.resolution);
      const tier = fromSlug === "pro" || fromResolution === "pro" ? "pro" : "standard";
      const seconds = klingV3TurboBillableSeconds({
        duration: params.duration,
        multiPrompt: fromSlug ? params.multiPrompt : void 0
      });
      return Math.ceil(exports.KLING_V3_TURBO_MILLI_USD_PER_SECOND[tier] * seconds / 10);
    }
    function klingV3TurboCreditCostFromInputs(inputs) {
      const falModelId = inputs.falModelId;
      return klingV3TurboCreditCost({
        resolution: inputs.resolution,
        duration: inputs.duration,
        falModelId,
        multiPrompt: isKlingV3TurboEndpoint(falModelId) ? inputs.multi_prompt : void 0
      });
    }
    function resolveStartFrame(params) {
      const { imageUrls = [], dynamicInputs = {} } = params;
      const named = toUrlArray(dynamicInputs.start_image ?? dynamicInputs.start_image_url ?? dynamicInputs.image_url)[0];
      return named ?? toUrlArray(imageUrls)[0];
    }
    function buildKlingV3TurboFalRequest(params) {
      const { prompt, imageUrls, resolution, aspectRatio, dynamicInputs = {} } = params;
      const tier = normalizeKlingV3TurboTier(resolution ?? dynamicInputs.resolution);
      const start = resolveStartFrame({ imageUrls, dynamicInputs });
      const input = {
        duration: klingV3TurboSentDuration(dynamicInputs.duration)
      };
      if (typeof prompt === "string" && prompt.trim())
        input.prompt = prompt;
      if (start) {
        return {
          falModelId: exports.KLING_V3_TURBO_ENDPOINTS[tier].i2v,
          input: { ...input, image_url: start }
        };
      }
      return {
        falModelId: exports.KLING_V3_TURBO_ENDPOINTS[tier].t2v,
        input: {
          ...input,
          aspect_ratio: normalizeKlingV3TurboAspectRatio(aspectRatio ?? dynamicInputs.aspect_ratio)
        }
      };
    }
    function hardenKlingV3TurboProxyInput(falModelId, input) {
      const kind = klingV3TurboKindFromEndpoint(falModelId);
      if (!kind || !input || typeof input !== "object" || Array.isArray(input))
        return input;
      input.duration = klingV3TurboSentDuration(input.duration);
      delete input.sync_mode;
      delete input.resolution;
      if (kind === "t2v") {
        input.aspect_ratio = normalizeKlingV3TurboAspectRatio(input.aspect_ratio);
      } else {
        delete input.aspect_ratio;
      }
      return input;
    }
  }
});

// ../packages/workflow-contracts/dist/klingV3.js
var require_klingV3 = __commonJS({
  "../packages/workflow-contracts/dist/klingV3.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.KLING_V3_DEFAULT_DURATION = exports.KLING_V3_MAX_DURATION = exports.KLING_V3_MIN_DURATION = void 0;
    exports.normalizeKlingV3Duration = normalizeKlingV3Duration;
    exports.klingV3BillableSeconds = klingV3BillableSeconds;
    exports.klingV3TierFromEndpoint = klingV3TierFromEndpoint;
    exports.klingV3BillableTier = klingV3BillableTier;
    exports.klingV3CreditCostFromInputs = klingV3CreditCostFromInputs;
    exports.isKlingV3Endpoint = isKlingV3Endpoint;
    exports.stripKlingV3UnbilledOptions = stripKlingV3UnbilledOptions;
    exports.hardenKlingV3ProxyInput = hardenKlingV3ProxyInput;
    exports.KLING_V3_MIN_DURATION = 3;
    exports.KLING_V3_MAX_DURATION = 15;
    exports.KLING_V3_DEFAULT_DURATION = 5;
    function normalizeKlingV3Duration(raw) {
      const value = raw === void 0 || raw === null || raw === "" ? String(exports.KLING_V3_DEFAULT_DURATION) : String(raw);
      const parsed = Number(value);
      if (!Number.isFinite(parsed))
        return String(exports.KLING_V3_DEFAULT_DURATION);
      return String(Math.min(exports.KLING_V3_MAX_DURATION, Math.max(exports.KLING_V3_MIN_DURATION, Math.trunc(parsed))));
    }
    function klingV3BillableSeconds(raw) {
      return Number(normalizeKlingV3Duration(raw));
    }
    var KLING_V3_ENDPOINT_RE = /^fal-ai\/kling-video\/v3\/(standard|pro|4k)\/(text|image)-to-video$/;
    var TENTHS_PER_SECOND = {
      standard: { audio: 126, silent: 84 },
      pro: { audio: 168, silent: 112 },
      "4k": { audio: 420, silent: 420 }
    };
    var TIER_RANK = { standard: 0, pro: 1, "4k": 2 };
    function klingV3TierFromEndpoint(falModelId) {
      if (typeof falModelId !== "string")
        return void 0;
      const match = KLING_V3_ENDPOINT_RE.exec(falModelId);
      return match ? match[1] : void 0;
    }
    function klingV3BillableTier(inputs) {
      const raw = String(inputs.resolution || "Standard").trim().toLowerCase();
      const fromInputs = raw === "4k" ? "4k" : raw === "pro" ? "pro" : "standard";
      const fromSlug = klingV3TierFromEndpoint(inputs.falModelId);
      if (!fromSlug)
        return fromInputs;
      return TIER_RANK[fromSlug] >= TIER_RANK[fromInputs] ? fromSlug : fromInputs;
    }
    function klingV3CreditCostFromInputs(inputs) {
      const tier = klingV3BillableTier(inputs);
      const rate = TENTHS_PER_SECOND[tier];
      const tenths = (inputs.generate_audio !== false ? rate.audio : rate.silent) * klingV3BillableSeconds(inputs.duration);
      return tenths / 10;
    }
    function isKlingV3Endpoint(falModelId) {
      return typeof falModelId === "string" && KLING_V3_ENDPOINT_RE.test(falModelId);
    }
    function stripKlingV3UnbilledOptions(input) {
      delete input.multi_prompt;
      if (Array.isArray(input.elements)) {
        input.elements = input.elements.map((element) => {
          if (!element || typeof element !== "object" || Array.isArray(element))
            return element;
          const { voice_id: _voice, ...rest } = element;
          return rest;
        });
      }
      return input;
    }
    function hardenKlingV3ProxyInput(falModelId, input) {
      if (!isKlingV3Endpoint(falModelId) || !input || typeof input !== "object" || Array.isArray(input))
        return null;
      const hadStoryboard = input.multi_prompt !== void 0 && input.multi_prompt !== null;
      stripKlingV3UnbilledOptions(input);
      input.duration = normalizeKlingV3Duration(input.duration);
      delete input.sync_mode;
      delete input.resolution;
      if (hadStoryboard && !(typeof input.prompt === "string" && input.prompt.trim())) {
        return "Kling V3 : le storyboard multi-plans (multi_prompt) n'est pas pris en charge ; envoyez un prompt.";
      }
      return null;
    }
  }
});

// ../packages/workflow-contracts/dist/minimaxH3MaxExtend.js
var require_minimaxH3MaxExtend = __commonJS({
  "../packages/workflow-contracts/dist/minimaxH3MaxExtend.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.H3MAX_EXTEND_MAX_SOURCE_SECONDS = exports.H3MAX_EXTEND_TOKENS_PER_SOURCE_SECOND = exports.H3MAX_EXTEND_CREDITS_PER_1K_EXTRA = exports.H3MAX_EXTEND_SOURCE_VIDEO_TOKENS = exports.H3MAX_EXTEND_REF_FREE_TOKENS = exports.H3MAX_EXTEND_DEFAULT_OUTPUT = exports.H3MAX_EXTEND_OUTPUTS = exports.H3MAX_EXTEND_DEFAULT_ASPECT = exports.H3MAX_EXTEND_ASPECTS = exports.H3MAX_EXTEND_DURATIONS = exports.H3MAX_EXTEND_DEFAULT_DURATION = exports.H3MAX_EXTEND_MAX_DURATION = exports.H3MAX_EXTEND_MIN_DURATION = exports.H3MAX_EXTEND_DEFAULT_RESOLUTION = exports.H3MAX_EXTEND_RESOLUTIONS = exports.H3MAX_EXTEND_ENDPOINTS = void 0;
    exports.h3MaxExtendCreditsPerSecond = h3MaxExtendCreditsPerSecond;
    exports.normalizeH3MaxExtendResolution = normalizeH3MaxExtendResolution;
    exports.normalizeH3MaxExtendDuration = normalizeH3MaxExtendDuration;
    exports.normalizeH3MaxExtendAspectRatio = normalizeH3MaxExtendAspectRatio;
    exports.normalizeH3MaxExtendOutput = normalizeH3MaxExtendOutput;
    exports.h3MaxExtendVariantFromEndpoint = h3MaxExtendVariantFromEndpoint;
    exports.h3MaxExtendCreditCost = h3MaxExtendCreditCost;
    exports.resolveH3MaxSourceVideo = resolveH3MaxSourceVideo;
    exports.buildH3MaxExtendFalRequest = buildH3MaxExtendFalRequest;
    exports.H3MAX_EXTEND_ENDPOINTS = {
      max: "minimax/h3-max/extend-video",
      turbo: "minimax/h3-max-turbo/extend-video"
    };
    exports.H3MAX_EXTEND_RESOLUTIONS = [
      "768P",
      "480P",
      "1080P",
      "2K"
    ];
    exports.H3MAX_EXTEND_DEFAULT_RESOLUTION = "768P";
    exports.H3MAX_EXTEND_MIN_DURATION = 1;
    exports.H3MAX_EXTEND_MAX_DURATION = 15;
    exports.H3MAX_EXTEND_DEFAULT_DURATION = 5;
    exports.H3MAX_EXTEND_DURATIONS = Array.from({ length: exports.H3MAX_EXTEND_MAX_DURATION }, (_, i) => i + 1);
    exports.H3MAX_EXTEND_ASPECTS = ["auto", "21:9", "16:9", "4:3", "1:1", "3:4", "9:16"];
    exports.H3MAX_EXTEND_DEFAULT_ASPECT = "auto";
    exports.H3MAX_EXTEND_OUTPUTS = ["extended", "continuation"];
    exports.H3MAX_EXTEND_DEFAULT_OUTPUT = "extended";
    exports.H3MAX_EXTEND_REF_FREE_TOKENS = 4096;
    exports.H3MAX_EXTEND_SOURCE_VIDEO_TOKENS = 4e3;
    exports.H3MAX_EXTEND_CREDITS_PER_1K_EXTRA = 2;
    var HALF_CREDITS_PER_SECOND = {
      max: { "480P": 10, "768P": 16, "1080P": 32, "2K": 64 },
      turbo: { "480P": 5, "768P": 8, "1080P": 16, "2K": 32 }
    };
    function h3MaxExtendCreditsPerSecond(variant, resolution) {
      return HALF_CREDITS_PER_SECOND[variant][normalizeH3MaxExtendResolution(resolution)] / 2;
    }
    var RESOLUTION_ALIASES = {
      "480p": "480P",
      "768p": "768P",
      "1080p": "1080P",
      "2k": "2K"
    };
    function normalizeH3MaxExtendResolution(raw) {
      if (raw === void 0 || raw === null || raw === "")
        return exports.H3MAX_EXTEND_DEFAULT_RESOLUTION;
      const key = String(raw).trim();
      if (exports.H3MAX_EXTEND_RESOLUTIONS.includes(key)) {
        return key;
      }
      return RESOLUTION_ALIASES[key.toLowerCase()] ?? exports.H3MAX_EXTEND_DEFAULT_RESOLUTION;
    }
    function normalizeH3MaxExtendDuration(raw) {
      if (raw === void 0 || raw === null || raw === "" || raw === "auto") {
        return exports.H3MAX_EXTEND_DEFAULT_DURATION;
      }
      const parsed = Number(raw);
      if (!Number.isFinite(parsed) || parsed <= 0)
        return exports.H3MAX_EXTEND_DEFAULT_DURATION;
      return Math.min(exports.H3MAX_EXTEND_MAX_DURATION, Math.max(exports.H3MAX_EXTEND_MIN_DURATION, Math.ceil(parsed)));
    }
    function normalizeH3MaxExtendAspectRatio(raw) {
      const value = typeof raw === "string" ? raw.trim() : "";
      return exports.H3MAX_EXTEND_ASPECTS.includes(value) ? value : exports.H3MAX_EXTEND_DEFAULT_ASPECT;
    }
    function normalizeH3MaxExtendOutput(raw) {
      return raw === "continuation" ? "continuation" : exports.H3MAX_EXTEND_DEFAULT_OUTPUT;
    }
    function h3MaxExtendVariantFromEndpoint(falModelId) {
      if (falModelId === exports.H3MAX_EXTEND_ENDPOINTS.max)
        return "max";
      if (falModelId === exports.H3MAX_EXTEND_ENDPOINTS.turbo)
        return "turbo";
      return null;
    }
    exports.H3MAX_EXTEND_TOKENS_PER_SOURCE_SECOND = 6855;
    exports.H3MAX_EXTEND_MAX_SOURCE_SECONDS = 60;
    function extendReferenceCredits(variant, sourceSeconds) {
      if (variant !== "max")
        return 0;
      const seconds = typeof sourceSeconds === "number" && Number.isFinite(sourceSeconds) && sourceSeconds >= 0 ? Math.min(exports.H3MAX_EXTEND_MAX_SOURCE_SECONDS, sourceSeconds) : exports.H3MAX_EXTEND_MAX_SOURCE_SECONDS;
      const tokens = Math.max(exports.H3MAX_EXTEND_SOURCE_VIDEO_TOKENS, Math.ceil(seconds * exports.H3MAX_EXTEND_TOKENS_PER_SOURCE_SECOND));
      const extra = Math.max(0, tokens - exports.H3MAX_EXTEND_REF_FREE_TOKENS);
      return extra === 0 ? 0 : Math.ceil(extra / 1e3) * exports.H3MAX_EXTEND_CREDITS_PER_1K_EXTRA;
    }
    function h3MaxExtendCreditCost(params) {
      const duration = normalizeH3MaxExtendDuration(params.duration);
      const half = HALF_CREDITS_PER_SECOND[params.variant][normalizeH3MaxExtendResolution(params.resolution)];
      return Math.ceil(half * duration / 2) + extendReferenceCredits(params.variant, params.sourceSeconds);
    }
    var toUrls = (value) => {
      const urls = [];
      const push = (entry) => {
        if (typeof entry === "string" && entry.trim())
          urls.push(entry.trim());
        else if (Array.isArray(entry))
          entry.forEach(push);
      };
      push(value);
      return urls;
    };
    function resolveH3MaxSourceVideo(dynamicInputs = {}) {
      return toUrls([
        dynamicInputs.video_url,
        dynamicInputs.video_urls,
        dynamicInputs.video,
        dynamicInputs.source_video
      ])[0];
    }
    function optionalSeed(dynamicInputs) {
      const raw = dynamicInputs.seed;
      if (raw === void 0 || raw === null || raw === "")
        return void 0;
      const seed = Number(raw);
      return Number.isFinite(seed) ? Math.trunc(seed) : void 0;
    }
    function buildH3MaxExtendFalRequest(params) {
      const { variant, resolution, aspectRatio, dynamicInputs = {} } = params;
      const videoUrl = resolveH3MaxSourceVideo(dynamicInputs);
      if (!videoUrl) {
        throw new Error("MiniMax H3 Max Extend n\xE9cessite une vid\xE9o source (video_url).");
      }
      const prompt = (params.prompt ?? "").trim();
      if (!prompt) {
        throw new Error("MiniMax H3 Max Extend n\xE9cessite un prompt qui d\xE9crit la suite de la vid\xE9o.");
      }
      const input = {
        video_url: videoUrl,
        prompt,
        duration: normalizeH3MaxExtendDuration(dynamicInputs.duration),
        resolution: normalizeH3MaxExtendResolution(resolution ?? dynamicInputs.resolution),
        aspect_ratio: normalizeH3MaxExtendAspectRatio(aspectRatio ?? dynamicInputs.aspect_ratio),
        output: normalizeH3MaxExtendOutput(dynamicInputs.output)
      };
      if (typeof dynamicInputs.enable_prompt_expansion === "boolean") {
        input.enable_prompt_expansion = dynamicInputs.enable_prompt_expansion;
      }
      if (typeof dynamicInputs.enable_safety_checker === "boolean") {
        input.enable_safety_checker = dynamicInputs.enable_safety_checker;
      }
      const seed = optionalSeed(dynamicInputs);
      if (seed !== void 0)
        input.seed = seed;
      return { falModelId: exports.H3MAX_EXTEND_ENDPOINTS[variant], input };
    }
  }
});

// ../packages/workflow-contracts/dist/minimaxH3MaxInsert.js
var require_minimaxH3MaxInsert = __commonJS({
  "../packages/workflow-contracts/dist/minimaxH3MaxInsert.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.H3MAX_INSERT_UNMEASURED_REF_VIDEO_SECONDS = exports.H3MAX_INSERT_MAX_SOURCE_SECONDS = exports.H3MAX_INSERT_TOKENS_PER_VIDEO_SECOND = exports.H3MAX_INSERT_CREDITS_PER_SECOND = exports.H3MAX_INSERT_CREDITS_PER_1K_EXTRA = exports.H3MAX_INSERT_TOKENS_PER_MEDIA = exports.H3MAX_INSERT_REF_FREE_TOKENS = exports.H3MAX_INSERT_MAX_REF_VIDEOS = exports.H3MAX_INSERT_MAX_REF_IMAGES = exports.H3MAX_INSERT_MAX_TIME = exports.H3MAX_INSERT_MIN_RESUME = exports.H3MAX_INSERT_MIN_START = exports.H3MAX_INSERT_DURATIONS = exports.H3MAX_INSERT_DEFAULT_DURATION = exports.H3MAX_INSERT_MAX_DURATION = exports.H3MAX_INSERT_MIN_DURATION = exports.H3MAX_INSERT_DEFAULT_RESOLUTION = exports.H3MAX_INSERT_RESOLUTIONS = exports.H3MAX_INSERT_ENDPOINT = void 0;
    exports.normalizeH3MaxInsertResolution = normalizeH3MaxInsertResolution;
    exports.normalizeH3MaxInsertDuration = normalizeH3MaxInsertDuration;
    exports.normalizeH3MaxInsertTimes = normalizeH3MaxInsertTimes;
    exports.collectH3MaxInsertReferences = collectH3MaxInsertReferences;
    exports.countH3MaxInsertReferences = countH3MaxInsertReferences;
    exports.h3MaxInsertCreditCost = h3MaxInsertCreditCost;
    exports.buildH3MaxInsertFalRequest = buildH3MaxInsertFalRequest;
    exports.H3MAX_INSERT_ENDPOINT = "minimax/h3-max/insert-video";
    exports.H3MAX_INSERT_RESOLUTIONS = ["768p", "480p"];
    exports.H3MAX_INSERT_DEFAULT_RESOLUTION = "768p";
    exports.H3MAX_INSERT_MIN_DURATION = 5;
    exports.H3MAX_INSERT_MAX_DURATION = 13;
    exports.H3MAX_INSERT_DEFAULT_DURATION = 5;
    exports.H3MAX_INSERT_DURATIONS = [5, 6, 7, 8, 9, 10, 11, 12, 13];
    exports.H3MAX_INSERT_MIN_START = 1.625;
    exports.H3MAX_INSERT_MIN_RESUME = 2.625;
    exports.H3MAX_INSERT_MAX_TIME = 60;
    exports.H3MAX_INSERT_MAX_REF_IMAGES = 9;
    exports.H3MAX_INSERT_MAX_REF_VIDEOS = 3;
    exports.H3MAX_INSERT_REF_FREE_TOKENS = 4096;
    exports.H3MAX_INSERT_TOKENS_PER_MEDIA = 4e3;
    exports.H3MAX_INSERT_CREDITS_PER_1K_EXTRA = 2;
    exports.H3MAX_INSERT_CREDITS_PER_SECOND = {
      "480p": 5,
      "768p": 6
    };
    function normalizeH3MaxInsertResolution(raw) {
      if (raw === void 0 || raw === null || raw === "")
        return exports.H3MAX_INSERT_DEFAULT_RESOLUTION;
      const key = String(raw).trim().toLowerCase();
      return exports.H3MAX_INSERT_RESOLUTIONS.includes(key) ? key : exports.H3MAX_INSERT_DEFAULT_RESOLUTION;
    }
    function normalizeH3MaxInsertDuration(raw) {
      if (raw === void 0 || raw === null || raw === "" || raw === "auto") {
        return exports.H3MAX_INSERT_DEFAULT_DURATION;
      }
      const parsed = Number(raw);
      if (!Number.isFinite(parsed) || parsed <= 0)
        return exports.H3MAX_INSERT_DEFAULT_DURATION;
      return Math.min(exports.H3MAX_INSERT_MAX_DURATION, Math.max(exports.H3MAX_INSERT_MIN_DURATION, Math.ceil(parsed)));
    }
    var readTime = (raw) => {
      if (raw === void 0 || raw === null || raw === "")
        return void 0;
      const parsed = typeof raw === "number" ? raw : Number(raw);
      return Number.isFinite(parsed) ? parsed : void 0;
    };
    var roundTime = (value) => Math.round(value * 1e3) / 1e3;
    function normalizeH3MaxInsertTimes(startRaw, resumeRaw) {
      const start = readTime(startRaw);
      const resume = readTime(resumeRaw);
      if (start === void 0 || resume === void 0)
        return null;
      const start_time = roundTime(Math.min(exports.H3MAX_INSERT_MAX_TIME, Math.max(exports.H3MAX_INSERT_MIN_START, start)));
      const resume_time = roundTime(Math.min(exports.H3MAX_INSERT_MAX_TIME, Math.max(exports.H3MAX_INSERT_MIN_RESUME, resume)));
      if (resume_time <= start_time)
        return null;
      return { start_time, resume_time };
    }
    var toUrls = (value, limit) => {
      const collected = [];
      const push = (entry) => {
        if (typeof entry === "string" && entry.trim())
          collected.push(entry.trim());
        else if (Array.isArray(entry))
          entry.forEach(push);
      };
      push(value);
      return Array.from(new Set(collected)).slice(0, limit);
    };
    function collectH3MaxInsertReferences(params) {
      const { imageUrls = [], dynamicInputs = {} } = params;
      const images = toUrls([
        imageUrls,
        dynamicInputs.reference_image_urls,
        dynamicInputs.reference_images,
        dynamicInputs.reference_image,
        dynamicInputs.reference_image_url,
        dynamicInputs.image_urls,
        dynamicInputs.image
      ], exports.H3MAX_INSERT_MAX_REF_IMAGES);
      const videos = toUrls([
        dynamicInputs.reference_video_urls,
        dynamicInputs.reference_videos,
        dynamicInputs.reference_video,
        dynamicInputs.reference_video_url
      ], exports.H3MAX_INSERT_MAX_REF_VIDEOS);
      return { images, videos };
    }
    function countH3MaxInsertReferences(inputs = {}) {
      const { images, videos } = collectH3MaxInsertReferences({ dynamicInputs: inputs });
      return { images: images.length, videos: videos.length };
    }
    exports.H3MAX_INSERT_TOKENS_PER_VIDEO_SECOND = 6855;
    exports.H3MAX_INSERT_MAX_SOURCE_SECONDS = 60;
    exports.H3MAX_INSERT_UNMEASURED_REF_VIDEO_SECONDS = 15;
    function insertReferenceCredits(referenceImageCount, referenceVideoCount, videoSeconds) {
      const legacyMedia = 1 + Math.max(0, referenceImageCount) + Math.max(0, referenceVideoCount);
      const seconds = typeof videoSeconds === "number" && Number.isFinite(videoSeconds) && videoSeconds >= 0 ? videoSeconds : exports.H3MAX_INSERT_MAX_SOURCE_SECONDS + Math.max(0, referenceVideoCount) * exports.H3MAX_INSERT_UNMEASURED_REF_VIDEO_SECONDS;
      const tokens = Math.max(legacyMedia * exports.H3MAX_INSERT_TOKENS_PER_MEDIA, Math.max(0, referenceImageCount) * exports.H3MAX_INSERT_TOKENS_PER_MEDIA + Math.ceil(seconds * exports.H3MAX_INSERT_TOKENS_PER_VIDEO_SECOND));
      const extra = Math.max(0, tokens - exports.H3MAX_INSERT_REF_FREE_TOKENS);
      return extra === 0 ? 0 : Math.ceil(extra / 1e3) * exports.H3MAX_INSERT_CREDITS_PER_1K_EXTRA;
    }
    function h3MaxInsertCreditCost(params) {
      const duration = normalizeH3MaxInsertDuration(params.duration);
      const perSecond = exports.H3MAX_INSERT_CREDITS_PER_SECOND[normalizeH3MaxInsertResolution(params.resolution)];
      const images = Math.min(exports.H3MAX_INSERT_MAX_REF_IMAGES, params.referenceImageCount ?? 0);
      const videos = Math.min(exports.H3MAX_INSERT_MAX_REF_VIDEOS, params.referenceVideoCount ?? 0);
      return perSecond * duration + insertReferenceCredits(images, videos, params.inputVideoSeconds);
    }
    var toSourceUrl = (dynamicInputs) => toUrls([dynamicInputs.video_url, dynamicInputs.video_urls, dynamicInputs.video, dynamicInputs.source_video], 1)[0];
    function optionalSeed(dynamicInputs) {
      const raw = dynamicInputs.seed;
      if (raw === void 0 || raw === null || raw === "")
        return void 0;
      const seed = Number(raw);
      if (!Number.isFinite(seed))
        return void 0;
      return Math.min(2147483647, Math.max(0, Math.trunc(seed)));
    }
    function buildH3MaxInsertFalRequest(params) {
      const { imageUrls, resolution, dynamicInputs = {} } = params;
      const videoUrl = toSourceUrl(dynamicInputs);
      if (!videoUrl) {
        throw new Error("MiniMax H3 Max Insert n\xE9cessite une vid\xE9o source (video_url).");
      }
      const times = normalizeH3MaxInsertTimes(dynamicInputs.start_time, dynamicInputs.resume_time);
      if (!times) {
        throw new Error("MiniMax H3 Max Insert : start_time (\u2265 1,625 s) et resume_time (\u2265 2,625 s, apr\xE8s start_time) sont requis.");
      }
      const { images, videos } = collectH3MaxInsertReferences({ imageUrls, dynamicInputs });
      const input = {
        video_url: videoUrl,
        start_time: times.start_time,
        resume_time: times.resume_time,
        duration: normalizeH3MaxInsertDuration(dynamicInputs.duration),
        resolution: normalizeH3MaxInsertResolution(resolution ?? dynamicInputs.resolution)
      };
      const prompt = (params.prompt ?? "").trim();
      if (prompt)
        input.prompt = prompt;
      if (images.length > 0)
        input.reference_image_urls = images;
      if (videos.length > 0)
        input.reference_video_urls = videos;
      if (typeof dynamicInputs.enable_prompt_expansion === "boolean") {
        input.enable_prompt_expansion = dynamicInputs.enable_prompt_expansion;
      }
      if (typeof dynamicInputs.color_match === "boolean") {
        input.color_match = dynamicInputs.color_match;
      }
      const seed = optionalSeed(dynamicInputs);
      if (seed !== void 0)
        input.seed = seed;
      return { falModelId: exports.H3MAX_INSERT_ENDPOINT, input };
    }
  }
});

// ../packages/workflow-contracts/dist/minimaxH3MaxStyles.js
var require_minimaxH3MaxStyles = __commonJS({
  "../packages/workflow-contracts/dist/minimaxH3MaxStyles.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.H3MAX_STYLES_CREDITS_PER_SECOND = exports.H3MAX_STYLES_DURATIONS = exports.H3MAX_STYLES_DEFAULT_DURATION = exports.H3MAX_STYLES_MAX_DURATION = exports.H3MAX_STYLES_MIN_DURATION = exports.H3MAX_STYLES_DEFAULT_ASPECT = exports.H3MAX_STYLES_ASPECTS = exports.H3MAX_DEFAULT_DAMAGE_LEVEL = exports.H3MAX_DAMAGE_LEVELS = exports.H3MAX_STYLE_ENDPOINTS = exports.H3MAX_STYLES_ENDPOINT_PREFIX = exports.H3MAX_DEFAULT_STYLE = exports.H3MAX_STYLE_LABELS = exports.H3MAX_STYLES = void 0;
    exports.normalizeH3MaxStyle = normalizeH3MaxStyle;
    exports.h3MaxStyleFromEndpoint = h3MaxStyleFromEndpoint;
    exports.normalizeH3MaxDamageLevel = normalizeH3MaxDamageLevel;
    exports.normalizeH3MaxStylesDuration = normalizeH3MaxStylesDuration;
    exports.normalizeH3MaxStylesAspectRatio = normalizeH3MaxStylesAspectRatio;
    exports.h3MaxStylesCreditCost = h3MaxStylesCreditCost;
    exports.buildH3MaxStylesFalRequest = buildH3MaxStylesFalRequest;
    exports.H3MAX_STYLES = [
      "vhs",
      "retro-toon-70s",
      "low-poly",
      "hand-drawn",
      "16bit-pixel"
    ];
    exports.H3MAX_STYLE_LABELS = {
      vhs: "VHS",
      "retro-toon-70s": "Retro Toon 70s",
      "low-poly": "Low Poly",
      "hand-drawn": "Hand Drawn",
      "16bit-pixel": "16-bit Pixel"
    };
    exports.H3MAX_DEFAULT_STYLE = "vhs";
    exports.H3MAX_STYLES_ENDPOINT_PREFIX = "minimax/h3-max/styles/";
    exports.H3MAX_STYLE_ENDPOINTS = {
      vhs: "minimax/h3-max/styles/vhs",
      "retro-toon-70s": "minimax/h3-max/styles/retro-toon-70s",
      "low-poly": "minimax/h3-max/styles/low-poly",
      "hand-drawn": "minimax/h3-max/styles/hand-drawn",
      "16bit-pixel": "minimax/h3-max/styles/16bit-pixel"
    };
    exports.H3MAX_DAMAGE_LEVELS = ["light", "medium", "heavy"];
    exports.H3MAX_DEFAULT_DAMAGE_LEVEL = "medium";
    exports.H3MAX_STYLES_ASPECTS = ["16:9", "21:9", "4:3", "1:1", "3:4", "9:16"];
    exports.H3MAX_STYLES_DEFAULT_ASPECT = "16:9";
    exports.H3MAX_STYLES_MIN_DURATION = 5;
    exports.H3MAX_STYLES_MAX_DURATION = 15;
    exports.H3MAX_STYLES_DEFAULT_DURATION = 5;
    exports.H3MAX_STYLES_DURATIONS = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    exports.H3MAX_STYLES_CREDITS_PER_SECOND = 8;
    function normalizeH3MaxStyle(raw) {
      const value = typeof raw === "string" ? raw.trim().toLowerCase() : "";
      return exports.H3MAX_STYLES.includes(value) ? value : exports.H3MAX_DEFAULT_STYLE;
    }
    function h3MaxStyleFromEndpoint(falModelId) {
      if (!falModelId.startsWith(exports.H3MAX_STYLES_ENDPOINT_PREFIX))
        return null;
      const style = falModelId.slice(exports.H3MAX_STYLES_ENDPOINT_PREFIX.length);
      return exports.H3MAX_STYLES.includes(style) ? style : null;
    }
    function normalizeH3MaxDamageLevel(raw) {
      return exports.H3MAX_DAMAGE_LEVELS.includes(raw) ? raw : exports.H3MAX_DEFAULT_DAMAGE_LEVEL;
    }
    function normalizeH3MaxStylesDuration(raw) {
      if (raw === void 0 || raw === null || raw === "" || raw === "auto") {
        return exports.H3MAX_STYLES_DEFAULT_DURATION;
      }
      const parsed = Number(raw);
      if (!Number.isFinite(parsed) || parsed <= 0)
        return exports.H3MAX_STYLES_DEFAULT_DURATION;
      return Math.min(exports.H3MAX_STYLES_MAX_DURATION, Math.max(exports.H3MAX_STYLES_MIN_DURATION, Math.ceil(parsed)));
    }
    function normalizeH3MaxStylesAspectRatio(raw) {
      const value = typeof raw === "string" ? raw.trim() : "";
      return exports.H3MAX_STYLES_ASPECTS.includes(value) ? value : exports.H3MAX_STYLES_DEFAULT_ASPECT;
    }
    function h3MaxStylesCreditCost(params) {
      return exports.H3MAX_STYLES_CREDITS_PER_SECOND * normalizeH3MaxStylesDuration(params.duration);
    }
    var firstUrl = (value) => {
      const urls = [];
      const push = (entry) => {
        if (typeof entry === "string" && entry.trim())
          urls.push(entry.trim());
        else if (Array.isArray(entry))
          entry.forEach(push);
      };
      push(value);
      return urls[0];
    };
    function optionalSeed(dynamicInputs) {
      const raw = dynamicInputs.seed;
      if (raw === void 0 || raw === null || raw === "")
        return void 0;
      const seed = Number(raw);
      return Number.isFinite(seed) ? Math.trunc(seed) : void 0;
    }
    function buildH3MaxStylesFalRequest(params) {
      const { imageUrls = [], aspectRatio, dynamicInputs = {} } = params;
      const prompt = (params.prompt ?? "").trim();
      if (!prompt) {
        throw new Error("MiniMax H3 Max Styles n\xE9cessite un prompt.");
      }
      const style = normalizeH3MaxStyle(dynamicInputs.style);
      const imageUrl = firstUrl([
        dynamicInputs.start_image,
        dynamicInputs.start_image_url,
        dynamicInputs.image_url,
        imageUrls
      ]);
      const input = {
        prompt,
        duration: normalizeH3MaxStylesDuration(dynamicInputs.duration)
      };
      if (imageUrl) {
        input.image_url = imageUrl;
      } else {
        input.aspect_ratio = normalizeH3MaxStylesAspectRatio(aspectRatio ?? dynamicInputs.aspect_ratio);
      }
      if (style === "vhs") {
        input.damage_level = normalizeH3MaxDamageLevel(dynamicInputs.damage_level);
      }
      const seed = optionalSeed(dynamicInputs);
      if (seed !== void 0)
        input.seed = seed;
      return { falModelId: exports.H3MAX_STYLE_ENDPOINTS[style], input };
    }
  }
});

// ../packages/workflow-contracts/dist/seedreamFlash.js
var require_seedreamFlash = __commonJS({
  "../packages/workflow-contracts/dist/seedreamFlash.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.hardenSeedreamFlashInput = exports.buildSeedreamFlashFalRequest = exports.getSeedreamFlashImageSize = exports.seedreamFlashCreditCost = exports.SEEDREAM_FLASH_CREDITS = exports.SEEDREAM_FLASH_MAX_INPUT_IMAGES = exports.SEEDREAM_FLASH_ENDPOINTS = exports.SEEDREAM_FLASH_EDIT_ENDPOINT = exports.SEEDREAM_FLASH_T2I_ENDPOINT = void 0;
    exports.SEEDREAM_FLASH_T2I_ENDPOINT = "bytedance/seedream/v5/flash/text-to-image";
    exports.SEEDREAM_FLASH_EDIT_ENDPOINT = "bytedance/seedream/v5/flash/edit";
    exports.SEEDREAM_FLASH_ENDPOINTS = /* @__PURE__ */ new Set([
      exports.SEEDREAM_FLASH_T2I_ENDPOINT,
      exports.SEEDREAM_FLASH_EDIT_ENDPOINT
    ]);
    exports.SEEDREAM_FLASH_MAX_INPUT_IMAGES = 10;
    exports.SEEDREAM_FLASH_CREDITS = 3;
    var seedreamFlashCreditCost = () => exports.SEEDREAM_FLASH_CREDITS;
    exports.seedreamFlashCreditCost = seedreamFlashCreditCost;
    var RATIOS = {
      "1:1": [1, 1],
      "16:9": [16, 9],
      "9:16": [9, 16],
      "4:3": [4, 3],
      "3:4": [3, 4],
      "3:2": [3, 2],
      "2:3": [2, 3],
      "21:9": [21, 9]
    };
    var TARGET_PIXELS = 2048 * 2048;
    var MIN_PIXELS = 1024 * 1024;
    var getSeedreamFlashImageSize = (aspectRatio) => {
      const ratio = RATIOS[String(aspectRatio ?? "")];
      if (!ratio)
        return "auto_2K";
      const [w, h] = ratio;
      const unit = Math.sqrt(TARGET_PIXELS / (w * h));
      const width = Math.floor(unit * w / 16) * 16;
      const height = Math.floor(unit * h / 16) * 16;
      if (width * height < MIN_PIXELS)
        return "auto_2K";
      return { width, height };
    };
    exports.getSeedreamFlashImageSize = getSeedreamFlashImageSize;
    var normalizeOutputFormat = (value) => String(value ?? "").toLowerCase() === "jpeg" ? "jpeg" : "png";
    var buildSeedreamFlashFalRequest = (params) => {
      const images = (params.imageUrls ?? []).filter((u) => typeof u === "string" && u.trim().length > 0);
      if (params.edit && images.length === 0) {
        throw new Error("Seedream 5 Flash (\xE9dition) n\xE9cessite au moins une image en entr\xE9e.");
      }
      const input = {
        prompt: params.prompt,
        image_size: (0, exports.getSeedreamFlashImageSize)(params.aspectRatio),
        num_images: 1,
        output_format: normalizeOutputFormat(params.outputFormat),
        enable_safety_checker: false
      };
      if (params.edit)
        input.image_urls = images.slice(0, exports.SEEDREAM_FLASH_MAX_INPUT_IMAGES);
      return {
        falModelId: params.edit ? exports.SEEDREAM_FLASH_EDIT_ENDPOINT : exports.SEEDREAM_FLASH_T2I_ENDPOINT,
        input
      };
    };
    exports.buildSeedreamFlashFalRequest = buildSeedreamFlashFalRequest;
    var hardenSeedreamFlashInput = (input) => {
      input.num_images = 1;
      delete input.sync_mode;
      if (Array.isArray(input.image_urls)) {
        input.image_urls = input.image_urls.slice(0, exports.SEEDREAM_FLASH_MAX_INPUT_IMAGES);
      }
      return input;
    };
    exports.hardenSeedreamFlashInput = hardenSeedreamFlashInput;
  }
});

// ../packages/workflow-contracts/dist/flux3Image.js
var require_flux3Image = __commonJS({
  "../packages/workflow-contracts/dist/flux3Image.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.hardenFlux3ImageInput = exports.buildFlux3ImageFalRequest = exports.flux3ImageCreditCost = exports.flux3ImageInputCount = exports.FLUX3_IMAGE_BASE_COST = exports.FLUX3_IMAGE_EDIT_CREDITS_PER_INPUT = exports.FLUX3_IMAGE_CREDITS = exports.normalizeFlux3ImageAspectRatio = exports.FLUX3_IMAGE_ASPECT_RATIOS = exports.normalizeFlux3ImageResolution = exports.FLUX3_IMAGE_DEFAULT_RESOLUTION = exports.FLUX3_IMAGE_RESOLUTIONS = exports.FLUX3_IMAGE_MAX_INPUT_IMAGES = exports.isFlux3ImageEndpoint = exports.FLUX3_IMAGE_ENDPOINTS = exports.FLUX3_IMAGE_EDIT_ENDPOINT = exports.FLUX3_IMAGE_T2I_ENDPOINT = void 0;
    exports.FLUX3_IMAGE_T2I_ENDPOINT = "blackforestlabs/flux-3/text-to-image";
    exports.FLUX3_IMAGE_EDIT_ENDPOINT = "blackforestlabs/flux-3/edit-image";
    exports.FLUX3_IMAGE_ENDPOINTS = /* @__PURE__ */ new Set([
      exports.FLUX3_IMAGE_T2I_ENDPOINT,
      exports.FLUX3_IMAGE_EDIT_ENDPOINT
    ]);
    var isFlux3ImageEndpoint = (falModelId) => exports.FLUX3_IMAGE_ENDPOINTS.has(String(falModelId ?? ""));
    exports.isFlux3ImageEndpoint = isFlux3ImageEndpoint;
    exports.FLUX3_IMAGE_MAX_INPUT_IMAGES = 10;
    exports.FLUX3_IMAGE_RESOLUTIONS = ["512sq", "768sq", "1k", "2k", "4k"];
    exports.FLUX3_IMAGE_DEFAULT_RESOLUTION = "1k";
    var normalizeFlux3ImageResolution = (value) => {
      const res = String(value ?? "").trim().toLowerCase();
      return exports.FLUX3_IMAGE_RESOLUTIONS.includes(res) ? res : exports.FLUX3_IMAGE_DEFAULT_RESOLUTION;
    };
    exports.normalizeFlux3ImageResolution = normalizeFlux3ImageResolution;
    exports.FLUX3_IMAGE_ASPECT_RATIOS = [
      "auto",
      "21:9",
      "2:1",
      "16:9",
      "3:2",
      "7:5",
      "4:3",
      "5:4",
      "1:1",
      "4:5",
      "3:4",
      "5:7",
      "2:3",
      "9:16",
      "1:2"
    ];
    var normalizeFlux3ImageAspectRatio = (value) => {
      const ar = String(value ?? "").trim();
      return exports.FLUX3_IMAGE_ASPECT_RATIOS.includes(ar) ? ar : "auto";
    };
    exports.normalizeFlux3ImageAspectRatio = normalizeFlux3ImageAspectRatio;
    exports.FLUX3_IMAGE_CREDITS = {
      "512sq": 5,
      "768sq": 5,
      "1k": 6,
      "2k": 24,
      "4k": 96
    };
    exports.FLUX3_IMAGE_EDIT_CREDITS_PER_INPUT = 21;
    exports.FLUX3_IMAGE_BASE_COST = exports.FLUX3_IMAGE_CREDITS[exports.FLUX3_IMAGE_DEFAULT_RESOLUTION];
    var flux3ImageInputCount = (inputs) => {
      const rec = inputs ?? {};
      let n;
      if (Array.isArray(rec.image_urls)) {
        n = rec.image_urls.filter((u) => typeof u === "string" && u.trim().length > 0).length;
      } else {
        n = Math.trunc(Number(rec.imageInputCount));
      }
      if (!Number.isFinite(n) || n < 1)
        n = 1;
      return Math.min(exports.FLUX3_IMAGE_MAX_INPUT_IMAGES, n);
    };
    exports.flux3ImageInputCount = flux3ImageInputCount;
    var flux3ImageCreditCost = (inputs, variant) => {
      const base = exports.FLUX3_IMAGE_CREDITS[(0, exports.normalizeFlux3ImageResolution)(inputs?.resolution)];
      if (variant === "t2i")
        return base;
      return base + exports.FLUX3_IMAGE_EDIT_CREDITS_PER_INPUT * (0, exports.flux3ImageInputCount)(inputs);
    };
    exports.flux3ImageCreditCost = flux3ImageCreditCost;
    var normalizeOutputFormat = (value) => String(value ?? "").toLowerCase() === "jpeg" ? "jpeg" : "png";
    var buildFlux3ImageFalRequest = (params) => {
      const images = (params.imageUrls ?? []).filter((u) => typeof u === "string" && u.trim().length > 0);
      if (params.edit && images.length === 0) {
        throw new Error("FLUX 3 Image (\xE9dition) n\xE9cessite au moins une image en entr\xE9e.");
      }
      const input = {
        prompt: params.prompt,
        ...params.edit ? { image_urls: images.slice(0, exports.FLUX3_IMAGE_MAX_INPUT_IMAGES) } : {},
        aspect_ratio: (0, exports.normalizeFlux3ImageAspectRatio)(params.aspectRatio),
        resolution: (0, exports.normalizeFlux3ImageResolution)(params.resolution),
        output_format: normalizeOutputFormat(params.outputFormat)
      };
      return {
        falModelId: params.edit ? exports.FLUX3_IMAGE_EDIT_ENDPOINT : exports.FLUX3_IMAGE_T2I_ENDPOINT,
        input
      };
    };
    exports.buildFlux3ImageFalRequest = buildFlux3ImageFalRequest;
    var hardenFlux3ImageInput = (input) => {
      input.resolution = (0, exports.normalizeFlux3ImageResolution)(input.resolution);
      if (input.aspect_ratio !== void 0) {
        input.aspect_ratio = (0, exports.normalizeFlux3ImageAspectRatio)(input.aspect_ratio);
      }
      if (Array.isArray(input.image_urls)) {
        input.image_urls = input.image_urls.slice(0, exports.FLUX3_IMAGE_MAX_INPUT_IMAGES);
      }
      delete input.sync_mode;
      delete input.duration;
      delete input.num_images;
      return input;
    };
    exports.hardenFlux3ImageInput = hardenFlux3ImageInput;
  }
});

// ../packages/workflow-contracts/dist/museImage.js
var require_museImage = __commonJS({
  "../packages/workflow-contracts/dist/museImage.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.hardenMuseImageInput = exports.buildMuseImageFalRequest = exports.normalizeMuseImageAspectRatio = exports.MUSE_IMAGE_ASPECT_RATIOS = exports.museImageCreditCost = exports.MUSE_IMAGE_CREDITS = exports.MUSE_IMAGE_MAX_INPUT_IMAGES = exports.MUSE_IMAGE_ENDPOINTS = exports.MUSE_IMAGE_EDIT_ENDPOINT = exports.MUSE_IMAGE_T2I_ENDPOINT = void 0;
    exports.MUSE_IMAGE_T2I_ENDPOINT = "meta/muse-image/text-to-image";
    exports.MUSE_IMAGE_EDIT_ENDPOINT = "meta/muse-image/edit";
    exports.MUSE_IMAGE_ENDPOINTS = /* @__PURE__ */ new Set([
      exports.MUSE_IMAGE_T2I_ENDPOINT,
      exports.MUSE_IMAGE_EDIT_ENDPOINT
    ]);
    exports.MUSE_IMAGE_MAX_INPUT_IMAGES = 10;
    exports.MUSE_IMAGE_CREDITS = 1;
    var museImageCreditCost = () => exports.MUSE_IMAGE_CREDITS;
    exports.museImageCreditCost = museImageCreditCost;
    exports.MUSE_IMAGE_ASPECT_RATIOS = ["1:1", "16:9", "9:16", "4:3", "3:4", "3:2", "2:3", "21:9"];
    var normalizeMuseImageAspectRatio = (value) => {
      const ar = String(value ?? "").trim();
      return exports.MUSE_IMAGE_ASPECT_RATIOS.includes(ar) ? ar : void 0;
    };
    exports.normalizeMuseImageAspectRatio = normalizeMuseImageAspectRatio;
    var normalizeOutputFormat = (value) => String(value ?? "").toLowerCase() === "jpeg" ? "jpeg" : "png";
    var buildMuseImageFalRequest = (params) => {
      const images = (params.imageUrls ?? []).filter((u) => typeof u === "string" && u.trim().length > 0);
      if (params.edit && images.length === 0) {
        throw new Error("Meta Muse Image (\xE9dition) n\xE9cessite au moins une image en entr\xE9e.");
      }
      const aspectRatio = (0, exports.normalizeMuseImageAspectRatio)(params.aspectRatio);
      const input = {
        prompt: params.prompt,
        ...params.edit ? { image_urls: images.slice(0, exports.MUSE_IMAGE_MAX_INPUT_IMAGES) } : {},
        ...aspectRatio ? { aspect_ratio: aspectRatio } : {},
        num_images: 1,
        output_format: normalizeOutputFormat(params.outputFormat)
      };
      return {
        falModelId: params.edit ? exports.MUSE_IMAGE_EDIT_ENDPOINT : exports.MUSE_IMAGE_T2I_ENDPOINT,
        input
      };
    };
    exports.buildMuseImageFalRequest = buildMuseImageFalRequest;
    var hardenMuseImageInput = (input) => {
      input.num_images = 1;
      delete input.sync_mode;
      if (Array.isArray(input.image_urls)) {
        input.image_urls = input.image_urls.slice(0, exports.MUSE_IMAGE_MAX_INPUT_IMAGES);
      }
      return input;
    };
    exports.hardenMuseImageInput = hardenMuseImageInput;
  }
});

// ../packages/workflow-contracts/dist/grokImagineQuality.js
var require_grokImagineQuality = __commonJS({
  "../packages/workflow-contracts/dist/grokImagineQuality.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.hardenGrokImagineQualityInput = exports.buildGrokImagineQualityFalRequest = exports.normalizeGrokImagineQualityAspectRatio = exports.grokImagineQualityCreditCost = exports.grokImagineQualityInputCount = exports.GROK_IMAGINE_QUALITY_BASE_COST = exports.GROK_IMAGINE_QUALITY_EDIT_CREDITS_PER_INPUT = exports.GROK_IMAGINE_QUALITY_CREDITS = exports.normalizeGrokImagineQualityResolution = exports.GROK_IMAGINE_QUALITY_DEFAULT_RESOLUTION = exports.GROK_IMAGINE_QUALITY_RESOLUTIONS = exports.GROK_IMAGINE_QUALITY_MAX_INPUT_IMAGES = exports.GROK_IMAGINE_QUALITY_ENDPOINTS = exports.GROK_IMAGINE_QUALITY_EDIT_ENDPOINT = exports.GROK_IMAGINE_QUALITY_T2I_ENDPOINT = void 0;
    exports.GROK_IMAGINE_QUALITY_T2I_ENDPOINT = "xai/grok-imagine-image/quality/text-to-image";
    exports.GROK_IMAGINE_QUALITY_EDIT_ENDPOINT = "xai/grok-imagine-image/quality/edit";
    exports.GROK_IMAGINE_QUALITY_ENDPOINTS = /* @__PURE__ */ new Set([
      exports.GROK_IMAGINE_QUALITY_T2I_ENDPOINT,
      exports.GROK_IMAGINE_QUALITY_EDIT_ENDPOINT
    ]);
    exports.GROK_IMAGINE_QUALITY_MAX_INPUT_IMAGES = 3;
    exports.GROK_IMAGINE_QUALITY_RESOLUTIONS = ["1k", "2k"];
    exports.GROK_IMAGINE_QUALITY_DEFAULT_RESOLUTION = "1k";
    var normalizeGrokImagineQualityResolution = (value) => {
      const res = String(value ?? "").trim().toLowerCase();
      return res === "2k" ? "2k" : exports.GROK_IMAGINE_QUALITY_DEFAULT_RESOLUTION;
    };
    exports.normalizeGrokImagineQualityResolution = normalizeGrokImagineQualityResolution;
    exports.GROK_IMAGINE_QUALITY_CREDITS = {
      "1k": 5,
      "2k": 7
    };
    exports.GROK_IMAGINE_QUALITY_EDIT_CREDITS_PER_INPUT = 1;
    exports.GROK_IMAGINE_QUALITY_BASE_COST = exports.GROK_IMAGINE_QUALITY_CREDITS[exports.GROK_IMAGINE_QUALITY_DEFAULT_RESOLUTION];
    var grokImagineQualityInputCount = (inputs) => {
      const rec = inputs ?? {};
      let n;
      if (Array.isArray(rec.image_urls)) {
        n = rec.image_urls.filter((u) => typeof u === "string" && u.trim().length > 0).length;
      } else {
        n = Math.trunc(Number(rec.imageInputCount));
      }
      if (!Number.isFinite(n) || n < 1)
        n = 1;
      return Math.min(exports.GROK_IMAGINE_QUALITY_MAX_INPUT_IMAGES, n);
    };
    exports.grokImagineQualityInputCount = grokImagineQualityInputCount;
    var grokImagineQualityCreditCost = (inputs, variant) => {
      const base = exports.GROK_IMAGINE_QUALITY_CREDITS[(0, exports.normalizeGrokImagineQualityResolution)(inputs?.resolution)];
      if (variant === "t2i")
        return base;
      return base + exports.GROK_IMAGINE_QUALITY_EDIT_CREDITS_PER_INPUT * (0, exports.grokImagineQualityInputCount)(inputs);
    };
    exports.grokImagineQualityCreditCost = grokImagineQualityCreditCost;
    var T2I_ASPECT_RATIOS = [
      "2:1",
      "20:9",
      "19.5:9",
      "16:9",
      "4:3",
      "3:2",
      "1:1",
      "2:3",
      "3:4",
      "9:16",
      "9:19.5",
      "9:20",
      "1:2"
    ];
    var normalizeGrokImagineQualityAspectRatio = (value, edit) => {
      const ar = String(value ?? "").trim();
      if (T2I_ASPECT_RATIOS.includes(ar))
        return ar;
      if (edit && ar === "auto")
        return "auto";
      if (ar === "21:9")
        return "2:1";
      return edit ? "auto" : "1:1";
    };
    exports.normalizeGrokImagineQualityAspectRatio = normalizeGrokImagineQualityAspectRatio;
    var normalizeOutputFormat = (value) => {
      const f = String(value ?? "").toLowerCase();
      return f === "png" || f === "webp" ? f : "jpeg";
    };
    var buildGrokImagineQualityFalRequest = (params) => {
      const images = (params.imageUrls ?? []).filter((u) => typeof u === "string" && u.trim().length > 0);
      if (params.edit && images.length === 0) {
        throw new Error("Grok Imagine Pro (\xE9dition) n\xE9cessite au moins une image en entr\xE9e.");
      }
      const input = {
        prompt: params.prompt,
        ...params.edit ? { image_urls: images.slice(0, exports.GROK_IMAGINE_QUALITY_MAX_INPUT_IMAGES) } : {},
        aspect_ratio: (0, exports.normalizeGrokImagineQualityAspectRatio)(params.aspectRatio, params.edit),
        resolution: (0, exports.normalizeGrokImagineQualityResolution)(params.resolution),
        num_images: 1,
        output_format: normalizeOutputFormat(params.outputFormat)
      };
      return {
        falModelId: params.edit ? exports.GROK_IMAGINE_QUALITY_EDIT_ENDPOINT : exports.GROK_IMAGINE_QUALITY_T2I_ENDPOINT,
        input
      };
    };
    exports.buildGrokImagineQualityFalRequest = buildGrokImagineQualityFalRequest;
    var hardenGrokImagineQualityInput = (input) => {
      input.resolution = (0, exports.normalizeGrokImagineQualityResolution)(input.resolution);
      input.num_images = 1;
      delete input.sync_mode;
      if (Array.isArray(input.image_urls)) {
        input.image_urls = input.image_urls.slice(0, exports.GROK_IMAGINE_QUALITY_MAX_INPUT_IMAGES);
      }
      return input;
    };
    exports.hardenGrokImagineQualityInput = hardenGrokImagineQualityInput;
  }
});

// ../packages/workflow-contracts/dist/ideogram45.js
var require_ideogram45 = __commonJS({
  "../packages/workflow-contracts/dist/ideogram45.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.hardenIdeogram45FalInput = exports.buildIdeogram45EditFalRequest = exports.buildIdeogram45T2IFalRequest = exports.getIdeogram45EditSize = exports.getIdeogram45T2ISize = exports.IDEOGRAM_45_BASE_COST = exports.ideogram45CreditCost = exports.normalizeIdeogram45Quality = exports.normalizeIdeogram45EditPrecision = exports.IDEOGRAM_45_MAX_REFERENCES_WITH_MASK = exports.IDEOGRAM_45_MAX_REFERENCES = exports.IDEOGRAM_45_DEFAULT_EDIT_PRECISION = exports.IDEOGRAM_45_EDIT_PRECISIONS = exports.IDEOGRAM_45_DEFAULT_QUALITY = exports.IDEOGRAM_45_EDIT_QUALITIES = exports.IDEOGRAM_45_T2I_QUALITIES = exports.IDEOGRAM_45_EDIT_ENDPOINT = exports.IDEOGRAM_45_T2I_ENDPOINT = void 0;
    exports.IDEOGRAM_45_T2I_ENDPOINT = "ideogram/v4.5";
    exports.IDEOGRAM_45_EDIT_ENDPOINT = "ideogram/v4.5/edit";
    exports.IDEOGRAM_45_T2I_QUALITIES = ["low", "medium", "high"];
    exports.IDEOGRAM_45_EDIT_QUALITIES = ["very_low", "low", "medium", "high"];
    exports.IDEOGRAM_45_DEFAULT_QUALITY = "medium";
    exports.IDEOGRAM_45_EDIT_PRECISIONS = ["regular", "high"];
    exports.IDEOGRAM_45_DEFAULT_EDIT_PRECISION = "regular";
    exports.IDEOGRAM_45_MAX_REFERENCES = 4;
    exports.IDEOGRAM_45_MAX_REFERENCES_WITH_MASK = 3;
    var normalizeIdeogram45EditPrecision = (value) => {
      const p = String(value ?? "").trim().toLowerCase();
      return p === "high" ? "high" : exports.IDEOGRAM_45_DEFAULT_EDIT_PRECISION;
    };
    exports.normalizeIdeogram45EditPrecision = normalizeIdeogram45EditPrecision;
    var normalizeIdeogram45Quality = (value, kind, editPrecision) => {
      const q = String(value ?? "").trim().toLowerCase().replace(/[\s-]+/g, "_");
      const allowed = kind === "t2i" ? exports.IDEOGRAM_45_T2I_QUALITIES : exports.IDEOGRAM_45_EDIT_QUALITIES;
      const quality = allowed.includes(q) ? q : exports.IDEOGRAM_45_DEFAULT_QUALITY;
      if (kind === "edit" && quality === "very_low" && (0, exports.normalizeIdeogram45EditPrecision)(editPrecision) === "high") {
        return "low";
      }
      return quality;
    };
    exports.normalizeIdeogram45Quality = normalizeIdeogram45Quality;
    var CREDITS = {
      very_low: 1,
      // $0.008
      low: 3,
      // $0.03
      medium: 6,
      // $0.06
      high: 22
      // $0.22
    };
    var ideogram45CreditCost = (inputs, kind) => CREDITS[(0, exports.normalizeIdeogram45Quality)(
      inputs?.quality,
      kind,
      // Le t2i n'a pas de précision : ne pas la lire (clé neutre pour la sonde
      // de plafond des apps partagées).
      kind === "edit" ? inputs?.edit_precision : void 0
    )];
    exports.ideogram45CreditCost = ideogram45CreditCost;
    exports.IDEOGRAM_45_BASE_COST = CREDITS[exports.IDEOGRAM_45_DEFAULT_QUALITY];
    var PRESET_BY_ASPECT = {
      "1:1": "square_hd",
      "16:9": "landscape_16_9",
      "9:16": "portrait_16_9",
      "4:3": "landscape_4_3",
      "3:4": "portrait_4_3"
    };
    var getIdeogram45T2ISize = (aspectRatio) => PRESET_BY_ASPECT[String(aspectRatio || "")] || "square_hd";
    exports.getIdeogram45T2ISize = getIdeogram45T2ISize;
    var getIdeogram45EditSize = (aspectRatio, editPrecision, hasMask) => {
      if (hasMask || (0, exports.normalizeIdeogram45EditPrecision)(editPrecision) !== "regular")
        return "auto";
      return PRESET_BY_ASPECT[String(aspectRatio || "")] || "auto";
    };
    exports.getIdeogram45EditSize = getIdeogram45EditSize;
    var isNonEmptyString = (value) => typeof value === "string" && value.trim().length > 0;
    var buildIdeogram45T2IFalRequest = (args) => {
      const dyn = args.dynamicInputs || {};
      const seed = Number(dyn.seed);
      return {
        falModelId: exports.IDEOGRAM_45_T2I_ENDPOINT,
        input: {
          prompt: args.prompt,
          image_size: (0, exports.getIdeogram45T2ISize)(args.aspectRatio),
          quality: (0, exports.normalizeIdeogram45Quality)(dyn.quality, "t2i"),
          num_images: 1,
          ...dyn.seed !== void 0 && dyn.seed !== null && dyn.seed !== "" && Number.isFinite(seed) ? { seed: Math.trunc(seed) } : {}
        }
      };
    };
    exports.buildIdeogram45T2IFalRequest = buildIdeogram45T2IFalRequest;
    var refusal = (message) => {
      const err = new Error(message);
      err.code = "failed-precondition";
      return err;
    };
    var buildIdeogram45EditFalRequest = (args) => {
      const dyn = args.dynamicInputs || {};
      const maskUrl = isNonEmptyString(dyn.mask_url) ? dyn.mask_url.trim() : void 0;
      const notMask = (url) => !maskUrl || url.trim() !== maskUrl;
      const urls = (args.imageUrls || []).filter(isNonEmptyString).filter(notMask);
      if (urls.length === 0) {
        throw refusal(maskUrl ? "Ideogram V4.5 (\xE9dition) : un masque seul ne suffit pas, branchez aussi l\u2019image \xE0 \xE9diter." : "Ideogram V4.5 (\xE9dition) n\xE9cessite une image en entr\xE9e.");
      }
      const editPrecision = (0, exports.normalizeIdeogram45EditPrecision)(dyn.edit_precision);
      const maxRefs = maskUrl ? exports.IDEOGRAM_45_MAX_REFERENCES_WITH_MASK : exports.IDEOGRAM_45_MAX_REFERENCES;
      const extraRefs = Array.isArray(dyn.reference_image_urls) ? dyn.reference_image_urls.filter(isNonEmptyString).filter(notMask) : [];
      const references = [...urls.slice(1), ...extraRefs].slice(0, maxRefs);
      const seed = Number(dyn.seed);
      return {
        falModelId: exports.IDEOGRAM_45_EDIT_ENDPOINT,
        input: {
          prompt: args.prompt,
          image_url: urls[0],
          ...references.length > 0 ? { reference_image_urls: references } : {},
          ...maskUrl ? { mask_url: maskUrl } : {},
          edit_precision: editPrecision,
          quality: (0, exports.normalizeIdeogram45Quality)(dyn.quality, "edit", editPrecision),
          image_size: (0, exports.getIdeogram45EditSize)(args.aspectRatio, editPrecision, Boolean(maskUrl)),
          num_images: 1,
          ...dyn.seed !== void 0 && dyn.seed !== null && dyn.seed !== "" && Number.isFinite(seed) ? { seed: Math.trunc(seed) } : {}
        }
      };
    };
    exports.buildIdeogram45EditFalRequest = buildIdeogram45EditFalRequest;
    var hardenIdeogram45FalInput = (falModelId, input) => {
      const kind = falModelId === exports.IDEOGRAM_45_T2I_ENDPOINT ? "t2i" : falModelId === exports.IDEOGRAM_45_EDIT_ENDPOINT ? "edit" : null;
      if (!kind)
        return false;
      input.num_images = 1;
      delete input.sync_mode;
      if (kind === "edit") {
        const precision = (0, exports.normalizeIdeogram45EditPrecision)(input.edit_precision);
        input.edit_precision = precision;
        input.quality = (0, exports.normalizeIdeogram45Quality)(input.quality, "edit", precision);
        if (Array.isArray(input.reference_image_urls)) {
          const mask = isNonEmptyString(input.mask_url) ? input.mask_url.trim() : void 0;
          const max = mask ? exports.IDEOGRAM_45_MAX_REFERENCES_WITH_MASK : exports.IDEOGRAM_45_MAX_REFERENCES;
          input.reference_image_urls = input.reference_image_urls.filter((url) => !mask || !isNonEmptyString(url) || url.trim() !== mask).slice(0, max);
        }
      } else {
        input.quality = (0, exports.normalizeIdeogram45Quality)(input.quality, "t2i");
      }
      return true;
    };
    exports.hardenIdeogram45FalInput = hardenIdeogram45FalInput;
  }
});

// ../packages/workflow-contracts/dist/ideogramV4Fast.js
var require_ideogramV4Fast = __commonJS({
  "../packages/workflow-contracts/dist/ideogramV4Fast.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.hardenIdeogramV4FastFalInput = exports.buildIdeogramV4FastFalRequest = exports.getIdeogramV4FastSize = exports.IDEOGRAM_V4_INSTANT_BASE_COST = exports.IDEOGRAM_V4_FAST_BASE_COST = exports.ideogramV4InstantCreditCost = exports.ideogramV4FastCreditCost = exports.normalizeIdeogramV4FastExpansionModel = exports.normalizeIdeogramV4RenderingSpeed = exports.IDEOGRAM_V4_BILLING_ENVELOPE_MP = exports.IDEOGRAM_V4_FAST_OUTPUT_FORMATS = exports.IDEOGRAM_V4_FAST_DEFAULT_EXPANSION_MODEL = exports.IDEOGRAM_V4_FAST_EXPANSION_MODELS = exports.IDEOGRAM_V4_DEFAULT_RENDERING_SPEED = exports.IDEOGRAM_V4_RENDERING_SPEEDS = exports.IDEOGRAM_V4_INSTANT_ENDPOINT = exports.IDEOGRAM_V4_FAST_ENDPOINT = void 0;
    exports.IDEOGRAM_V4_FAST_ENDPOINT = "ideogram/v4/fast";
    exports.IDEOGRAM_V4_INSTANT_ENDPOINT = "ideogram/v4/instant";
    exports.IDEOGRAM_V4_RENDERING_SPEEDS = ["TURBO", "BALANCED", "QUALITY"];
    exports.IDEOGRAM_V4_DEFAULT_RENDERING_SPEED = "BALANCED";
    exports.IDEOGRAM_V4_FAST_EXPANSION_MODELS = ["None", "Medium"];
    exports.IDEOGRAM_V4_FAST_DEFAULT_EXPANSION_MODEL = "Medium";
    exports.IDEOGRAM_V4_FAST_OUTPUT_FORMATS = ["png", "jpeg"];
    exports.IDEOGRAM_V4_BILLING_ENVELOPE_MP = 4;
    var FAST_MICRO_USD_PER_MP = {
      TURBO: 5250,
      BALANCED: 10500,
      QUALITY: 17500
    };
    var INSTANT_MICRO_USD_PER_MP = 7500;
    var normalizeIdeogramV4RenderingSpeed = (value) => {
      const s = String(value ?? "").trim().toUpperCase();
      return exports.IDEOGRAM_V4_RENDERING_SPEEDS.includes(s) ? s : exports.IDEOGRAM_V4_DEFAULT_RENDERING_SPEED;
    };
    exports.normalizeIdeogramV4RenderingSpeed = normalizeIdeogramV4RenderingSpeed;
    var normalizeIdeogramV4FastExpansionModel = (value) => {
      const s = String(value ?? "").trim().toLowerCase();
      if (s === "none")
        return "None";
      return exports.IDEOGRAM_V4_FAST_DEFAULT_EXPANSION_MODEL;
    };
    exports.normalizeIdeogramV4FastExpansionModel = normalizeIdeogramV4FastExpansionModel;
    var normalizeOutputFormat = (value) => {
      const s = String(value ?? "").trim().toLowerCase();
      if (s === "jpeg" || s === "jpg")
        return "jpeg";
      return "png";
    };
    var billableMicroUsd = (ratePerMp, imageSize) => {
      const envelope = ratePerMp * exports.IDEOGRAM_V4_BILLING_ENVELOPE_MP;
      if (imageSize && typeof imageSize === "object") {
        const w = Number(imageSize.width);
        const h = Number(imageSize.height);
        if (Number.isFinite(w) && Number.isFinite(h) && w > 0 && h > 0) {
          const actual = Math.ceil(ratePerMp * Math.ceil(w) * Math.ceil(h) / 1e6);
          return Math.max(envelope, actual);
        }
      }
      return envelope;
    };
    var microUsdToCredits = (microUsd) => Math.ceil(microUsd / 1e4);
    var ideogramV4FastCreditCost = (inputs) => microUsdToCredits(billableMicroUsd(FAST_MICRO_USD_PER_MP[(0, exports.normalizeIdeogramV4RenderingSpeed)(inputs?.rendering_speed)], inputs?.image_size));
    exports.ideogramV4FastCreditCost = ideogramV4FastCreditCost;
    var ideogramV4InstantCreditCost = (inputs) => microUsdToCredits(billableMicroUsd(INSTANT_MICRO_USD_PER_MP, inputs?.image_size));
    exports.ideogramV4InstantCreditCost = ideogramV4InstantCreditCost;
    exports.IDEOGRAM_V4_FAST_BASE_COST = (0, exports.ideogramV4FastCreditCost)({});
    exports.IDEOGRAM_V4_INSTANT_BASE_COST = (0, exports.ideogramV4InstantCreditCost)({});
    var PRESET_BY_ASPECT = {
      "1:1": "square_hd",
      "16:9": "landscape_16_9",
      "9:16": "portrait_16_9",
      "4:3": "landscape_4_3",
      "3:4": "portrait_4_3"
    };
    var getIdeogramV4FastSize = (aspectRatio) => PRESET_BY_ASPECT[String(aspectRatio || "")] || "square_hd";
    exports.getIdeogramV4FastSize = getIdeogramV4FastSize;
    var buildIdeogramV4FastFalRequest = (args) => {
      const dyn = args.dynamicInputs || {};
      const seed = Number(dyn.seed);
      return {
        falModelId: args.variant === "fast" ? exports.IDEOGRAM_V4_FAST_ENDPOINT : exports.IDEOGRAM_V4_INSTANT_ENDPOINT,
        input: {
          prompt: args.prompt,
          image_size: (0, exports.getIdeogramV4FastSize)(args.aspectRatio),
          ...args.variant === "fast" ? { rendering_speed: (0, exports.normalizeIdeogramV4RenderingSpeed)(dyn.rendering_speed) } : {},
          expansion_model: (0, exports.normalizeIdeogramV4FastExpansionModel)(dyn.expansion_model),
          num_images: 1,
          output_format: normalizeOutputFormat(dyn.output_format || args.outputFormat),
          ...dyn.seed !== void 0 && dyn.seed !== null && dyn.seed !== "" && Number.isFinite(seed) ? { seed: Math.trunc(seed) } : {}
        }
      };
    };
    exports.buildIdeogramV4FastFalRequest = buildIdeogramV4FastFalRequest;
    var hardenIdeogramV4FastFalInput = (falModelId, input) => {
      const variant = falModelId === exports.IDEOGRAM_V4_FAST_ENDPOINT ? "fast" : falModelId === exports.IDEOGRAM_V4_INSTANT_ENDPOINT ? "instant" : null;
      if (!variant)
        return false;
      input.num_images = 1;
      delete input.sync_mode;
      if (variant === "fast") {
        input.rendering_speed = (0, exports.normalizeIdeogramV4RenderingSpeed)(input.rendering_speed);
      } else {
        delete input.rendering_speed;
      }
      input.expansion_model = (0, exports.normalizeIdeogramV4FastExpansionModel)(input.expansion_model);
      if (input.output_format !== void 0) {
        input.output_format = normalizeOutputFormat(input.output_format);
      }
      return true;
    };
    exports.hardenIdeogramV4FastFalInput = hardenIdeogramV4FastFalInput;
  }
});

// ../packages/workflow-contracts/dist/recraftV41.js
var require_recraftV41 = __commonJS({
  "../packages/workflow-contracts/dist/recraftV41.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getRecraftV41Size = exports.isRecraftV41VariantId = exports.RECRAFT_V41_VARIANT_IDS = exports.RECRAFT_V41_VARIANTS = void 0;
    exports.RECRAFT_V41_VARIANTS = {
      "recraft-v4.1": {
        endpoint: "fal-ai/recraft/v4.1/text-to-image",
        credits: 4,
        vector: false,
        displayName: "Recraft V4.1"
      },
      "recraft-v4.1-vector": {
        endpoint: "fal-ai/recraft/v4.1/text-to-vector",
        credits: 8,
        vector: true,
        displayName: "Recraft V4.1 Vector"
      },
      "recraft-v4.1-flash": {
        endpoint: "recraft/v4.1/flash/text-to-image",
        credits: 1,
        vector: false,
        displayName: "Recraft V4.1 Flash"
      },
      "recraft-v4.1-utility": {
        endpoint: "fal-ai/recraft/v4.1/utility/text-to-image",
        credits: 4,
        vector: false,
        displayName: "Recraft V4.1 Utility"
      },
      "recraft-v4.1-utility-pro": {
        endpoint: "fal-ai/recraft/v4.1/utility/pro/text-to-image",
        credits: 21,
        vector: false,
        displayName: "Recraft V4.1 Utility Pro"
      }
    };
    exports.RECRAFT_V41_VARIANT_IDS = Object.keys(exports.RECRAFT_V41_VARIANTS);
    var isRecraftV41VariantId = (id) => Object.prototype.hasOwnProperty.call(exports.RECRAFT_V41_VARIANTS, id);
    exports.isRecraftV41VariantId = isRecraftV41VariantId;
    var PRESET_BY_ASPECT = {
      "1:1": "square_hd",
      "16:9": "landscape_16_9",
      "9:16": "portrait_16_9",
      "4:3": "landscape_4_3",
      "3:4": "portrait_4_3"
    };
    var getRecraftV41Size = (aspectRatio) => PRESET_BY_ASPECT[String(aspectRatio || "")] || "square_hd";
    exports.getRecraftV41Size = getRecraftV41Size;
  }
});

// ../packages/workflow-contracts/dist/grokVideo.js
var require_grokVideo = __commonJS({
  "../packages/workflow-contracts/dist/grokVideo.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GROK_VIDEO_ENDPOINTS = exports.GROK_VIDEO_ENDPOINT_TO_SPEC = exports.isGrokVideoModelId = exports.GROK_VIDEO_MODEL_IDS = exports.GROK_VIDEO_SPECS = exports.GROK_VIDEO_EDIT_INPUT_BILLED_SECONDS = exports.GROK_VIDEO_EDIT_OUTPUT_BILLED_SECONDS = exports.GROK_VIDEO_EXTEND_OUTPUT_MARGIN_SECONDS = exports.GROK_VIDEO_EXTEND_INPUT_MAX_SECONDS = exports.GROK_VIDEO_MAX_REFERENCE_IMAGES = exports.GROK_VIDEO_I2V_V1_ASPECTS = exports.GROK_VIDEO_ASPECTS = void 0;
    exports.grokVideoSpec = grokVideoSpec;
    exports.normalizeGrokVideoResolution = normalizeGrokVideoResolution;
    exports.normalizeGrokVideoDuration = normalizeGrokVideoDuration;
    exports.normalizeGrokVideoAspectRatio = normalizeGrokVideoAspectRatio;
    exports.resolveGrokVideoKind = resolveGrokVideoKind;
    exports.grokVideoCreditCost = grokVideoCreditCost;
    exports.grokVideoBaseCost = grokVideoBaseCost;
    exports.buildGrokVideoFalRequest = buildGrokVideoFalRequest;
    exports.normalizeGrokVideoProxyPayload = normalizeGrokVideoProxyPayload;
    exports.GROK_VIDEO_ASPECTS = ["16:9", "4:3", "3:2", "1:1", "2:3", "3:4", "9:16"];
    exports.GROK_VIDEO_I2V_V1_ASPECTS = ["auto", ...exports.GROK_VIDEO_ASPECTS];
    exports.GROK_VIDEO_MAX_REFERENCE_IMAGES = 7;
    exports.GROK_VIDEO_EXTEND_INPUT_MAX_SECONDS = 15;
    exports.GROK_VIDEO_EXTEND_OUTPUT_MARGIN_SECONDS = 1;
    exports.GROK_VIDEO_EDIT_OUTPUT_BILLED_SECONDS = 9;
    exports.GROK_VIDEO_EDIT_INPUT_BILLED_SECONDS = 8;
    var GROK_VIDEO_INPUT_CREDITS_PER_SECOND = 1;
    var T2V_V1 = {
      endpoint: "xai/grok-imagine-video/text-to-video",
      resolutions: ["720p", "480p"],
      duration: { min: 1, max: 15, def: 6 },
      aspectRatios: exports.GROK_VIDEO_ASPECTS,
      maxImages: 0
    };
    exports.GROK_VIDEO_SPECS = {
      "grok-video": {
        t2v: T2V_V1,
        i2v: {
          endpoint: "xai/grok-imagine-video/image-to-video",
          resolutions: ["720p", "480p"],
          duration: { min: 1, max: 15, def: 6 },
          aspectRatios: exports.GROK_VIDEO_I2V_V1_ASPECTS,
          maxImages: 1
        },
        r2v: {
          endpoint: "xai/grok-imagine-video/reference-to-video",
          resolutions: ["480p", "720p"],
          duration: { min: 1, max: 10, def: 8 },
          aspectRatios: exports.GROK_VIDEO_ASPECTS,
          maxImages: exports.GROK_VIDEO_MAX_REFERENCE_IMAGES
        }
      },
      "grok-video-1-5": {
        t2v: {
          endpoint: "xai/grok-imagine-video/v1.5/text-to-video",
          resolutions: ["720p", "480p", "1080p"],
          duration: { min: 1, max: 15, def: 6 },
          aspectRatios: exports.GROK_VIDEO_ASPECTS,
          maxImages: 0
        },
        i2v: {
          endpoint: "xai/grok-imagine-video/v1.5/image-to-video",
          resolutions: ["720p", "480p", "1080p"],
          duration: { min: 1, max: 15, def: 6 },
          // Le schéma v1.5 image-to-video n'a PAS d'aspect_ratio : le cadrage vient de l'image.
          aspectRatios: null,
          maxImages: 1
        },
        r2v: {
          endpoint: "xai/grok-imagine-video/v1.5/reference-to-video",
          resolutions: ["480p", "720p"],
          duration: { min: 1, max: 15, def: 8 },
          aspectRatios: exports.GROK_VIDEO_ASPECTS,
          maxImages: exports.GROK_VIDEO_MAX_REFERENCE_IMAGES
        }
      },
      "grok-video-1-5-lite": {
        t2v: {
          endpoint: "xai/grok-imagine-video/v1.5/lite/text-to-video",
          resolutions: ["720p", "480p", "1080p"],
          duration: { min: 1, max: 15, def: 6 },
          aspectRatios: exports.GROK_VIDEO_ASPECTS,
          maxImages: 0
        },
        i2v: {
          endpoint: "xai/grok-imagine-video/v1.5/lite/image-to-video",
          resolutions: ["720p", "480p", "1080p"],
          duration: { min: 1, max: 15, def: 6 },
          aspectRatios: null,
          maxImages: 1
        }
      },
      "grok-video-extend": {
        extend: {
          endpoint: "xai/grok-imagine-video/extend-video",
          resolutions: null,
          duration: { min: 2, max: 10, def: 6 },
          aspectRatios: null,
          maxImages: 0
        }
      },
      "grok-video-edit": {
        edit: {
          endpoint: "xai/grok-imagine-video/edit-video",
          // `auto` EXCLU (voir en-tête). 720p en tête : le palier le plus cher est
          // le défaut, une résolution absente ne peut pas sous-facturer.
          resolutions: ["720p", "480p"],
          duration: null,
          aspectRatios: null,
          maxImages: 0
        }
      }
    };
    exports.GROK_VIDEO_MODEL_IDS = Object.keys(exports.GROK_VIDEO_SPECS);
    var isGrokVideoModelId = (modelId) => typeof modelId === "string" && Object.prototype.hasOwnProperty.call(exports.GROK_VIDEO_SPECS, modelId);
    exports.isGrokVideoModelId = isGrokVideoModelId;
    exports.GROK_VIDEO_ENDPOINT_TO_SPEC = Object.fromEntries(exports.GROK_VIDEO_MODEL_IDS.flatMap((modelId) => Object.entries(exports.GROK_VIDEO_SPECS[modelId]).map(([kind, spec]) => [spec.endpoint, { modelId, kind }])));
    exports.GROK_VIDEO_ENDPOINTS = Object.keys(exports.GROK_VIDEO_ENDPOINT_TO_SPEC);
    var CREDITS_PER_SECOND = {
      // v1 n'a pas de 1080p : valeur alignée sur le 720p pour qu'aucun chemin ne
      // puisse sous-facturer si elle arrivait quand même (elle est normalisée avant).
      v1: { "480p": 5, "720p": 7, "1080p": 7 },
      "v1.5": { "480p": 8, "720p": 14, "1080p": 25 },
      lite: { "480p": 2, "720p": 3, "1080p": 14 }
    };
    var IMAGE_FEE_HUNDREDTHS = {
      v1: 20,
      // 0,002 $
      "v1.5": 100,
      // 0,01 $
      lite: 100
      // 0,01 $
    };
    var generationOf = (modelId) => modelId === "grok-video-1-5" ? "v1.5" : modelId === "grok-video-1-5-lite" ? "lite" : "v1";
    var refusal = (message) => {
      const err = new Error(message);
      err.code = "failed-precondition";
      return err;
    };
    var toUrlArray = (value) => {
      const out = [];
      const push = (v) => {
        if (typeof v === "string" && v.trim())
          out.push(v.trim());
        else if (Array.isArray(v))
          v.forEach(push);
      };
      push(value);
      return Array.from(new Set(out));
    };
    var firstUrl = (value) => toUrlArray(value)[0];
    var readAlias = (inputs, keys) => {
      for (const key of keys) {
        const v = inputs[key];
        if (v !== void 0 && v !== null && v !== "")
          return v;
      }
      return void 0;
    };
    var REFERENCE_KEYS = ["reference_image_urls", "reference_images", "reference_image", "reference_image_url"];
    var START_KEYS = ["image_url", "start_image", "start_image_url"];
    var VIDEO_KEYS = ["video_url", "video_urls", "video"];
    function grokVideoSpec(modelId, kind) {
      return exports.GROK_VIDEO_SPECS[modelId]?.[kind];
    }
    function normalizeGrokVideoResolution(spec, raw) {
      if (!spec.resolutions)
        return void 0;
      const def = spec.resolutions[0];
      if (raw === void 0 || raw === null)
        return def;
      const value = String(raw).trim().toLowerCase();
      if (!value)
        return def;
      if (spec.resolutions.includes(value))
        return value;
      if (value === "1080p" && spec.resolutions.includes("720p"))
        return "720p";
      return def;
    }
    function normalizeGrokVideoDuration(spec, raw) {
      if (!spec.duration)
        return void 0;
      const { min, max, def } = spec.duration;
      if (raw === void 0 || raw === null || raw === "" || raw === "auto")
        return def;
      const parsed = Number(raw);
      if (!Number.isFinite(parsed) || parsed <= 0)
        return def;
      return Math.min(max, Math.max(min, Math.trunc(parsed)));
    }
    function normalizeGrokVideoAspectRatio(spec, raw) {
      if (!spec.aspectRatios)
        return void 0;
      const value = String(raw ?? "").trim();
      return spec.aspectRatios.includes(value) ? value : spec.aspectRatios[0];
    }
    var readMedia = (imageUrls, dynamicInputs) => ({
      start: firstUrl(readAlias(dynamicInputs, START_KEYS)),
      references: toUrlArray(REFERENCE_KEYS.map((k) => dynamicInputs[k])),
      positional: toUrlArray(imageUrls),
      video: firstUrl(readAlias(dynamicInputs, VIDEO_KEYS))
    });
    function resolveGrokVideoKind(params) {
      const { modelId, imageUrls, dynamicInputs = {} } = params;
      if (modelId === "grok-video-extend")
        return "extend";
      if (modelId === "grok-video-edit")
        return "edit";
      const media = readMedia(imageUrls, dynamicInputs);
      const hasR2v = Boolean(exports.GROK_VIDEO_SPECS[modelId].r2v);
      if (hasR2v && media.references.length > 0)
        return "r2v";
      if (media.start || media.positional[0] || media.references[0])
        return "i2v";
      return "t2v";
    }
    var imagesFor = (kind, media) => {
      if (kind === "i2v") {
        const one = media.start ?? media.positional[0] ?? media.references[0];
        return one ? [one] : [];
      }
      if (kind === "r2v") {
        return Array.from(new Set([media.start, ...media.references, ...media.positional].filter((u) => Boolean(u)))).slice(0, exports.GROK_VIDEO_MAX_REFERENCE_IMAGES);
      }
      return [];
    };
    function planGrokVideo(params) {
      const dynamicInputs = params.dynamicInputs ?? {};
      const kind = params.kind ?? resolveGrokVideoKind(params);
      const spec = grokVideoSpec(params.modelId, kind);
      if (!spec) {
        throw refusal(`Grok Imagine Video : la capacit\xE9 ${kind} n'existe pas pour ${params.modelId}.`);
      }
      const media = readMedia(params.imageUrls, dynamicInputs);
      return {
        modelId: params.modelId,
        kind,
        spec,
        // Lectures PARESSEUSES : un champ que l'endpoint n'a pas n'est même pas lu
        // (la sonde de prix des apps partagées vérifie que toute clé lue compte).
        resolution: spec.resolutions ? normalizeGrokVideoResolution(spec, params.resolution ?? dynamicInputs.resolution) : void 0,
        duration: spec.duration ? normalizeGrokVideoDuration(spec, params.duration ?? dynamicInputs.duration) : void 0,
        aspectRatio: params.withAspect && spec.aspectRatios ? normalizeGrokVideoAspectRatio(spec, params.aspectRatio ?? dynamicInputs.aspect_ratio) : void 0,
        images: imagesFor(kind, media),
        video: media.video
      };
    }
    var costOfPlan = (plan) => {
      const generation = generationOf(plan.modelId);
      const cps = CREDITS_PER_SECOND[generation];
      if (plan.kind === "edit") {
        const res2 = plan.resolution === "480p" ? "480p" : "720p";
        return cps[res2] * exports.GROK_VIDEO_EDIT_OUTPUT_BILLED_SECONDS + GROK_VIDEO_INPUT_CREDITS_PER_SECOND * exports.GROK_VIDEO_EDIT_INPUT_BILLED_SECONDS;
      }
      if (plan.kind === "extend") {
        const extension = plan.duration ?? 0;
        return cps["720p"] * (exports.GROK_VIDEO_EXTEND_INPUT_MAX_SECONDS + exports.GROK_VIDEO_EXTEND_OUTPUT_MARGIN_SECONDS + extension) + GROK_VIDEO_INPUT_CREDITS_PER_SECOND * exports.GROK_VIDEO_EXTEND_INPUT_MAX_SECONDS;
      }
      const res = plan.resolution ?? "720p";
      const base = cps[res] * (plan.duration ?? 0);
      if (plan.kind === "t2v")
        return base;
      const imageCount = Math.max(1, plan.images.length);
      const feeHundredths = IMAGE_FEE_HUNDREDTHS[generation] * imageCount;
      return base + Math.ceil(feeHundredths / 100);
    };
    function grokVideoCreditCost(params) {
      const fromEndpoint = params.falModelId ? exports.GROK_VIDEO_ENDPOINT_TO_SPEC[String(params.falModelId)] : void 0;
      const plan = planGrokVideo({
        ...params,
        modelId: fromEndpoint?.modelId ?? params.modelId,
        kind: fromEndpoint?.kind
      });
      return costOfPlan(plan);
    }
    function grokVideoBaseCost(modelId) {
      return grokVideoCreditCost({ modelId });
    }
    function buildGrokVideoFalRequest(params) {
      const { modelId, prompt, imageUrls = [], resolution, aspectRatio, dynamicInputs = {} } = params;
      const plan = planGrokVideo({
        modelId,
        imageUrls,
        resolution: resolution ?? void 0,
        aspectRatio: aspectRatio ?? void 0,
        dynamicInputs,
        withAspect: true
      });
      const input = { prompt };
      if (plan.kind === "extend" || plan.kind === "edit") {
        if (!plan.video) {
          throw refusal(plan.kind === "extend" ? "Grok Imagine Video \xB7 Prolonger a besoin d'une vid\xE9o en entr\xE9e (MP4 de 2 \xE0 15 s)." : "Grok Imagine Video \xB7 \xC9diter a besoin d'une vid\xE9o en entr\xE9e.");
        }
        input.video_url = plan.video;
      }
      if (plan.kind === "i2v") {
        if (!plan.images[0])
          throw refusal("Grok Imagine Video : image de d\xE9part manquante.");
        input.image_url = plan.images[0];
      }
      if (plan.kind === "r2v") {
        input.reference_image_urls = plan.images;
      }
      if (plan.duration !== void 0)
        input.duration = plan.duration;
      if (plan.resolution !== void 0)
        input.resolution = plan.resolution;
      if (plan.aspectRatio !== void 0)
        input.aspect_ratio = plan.aspectRatio;
      return { falModelId: plan.spec.endpoint, input };
    }
    function normalizeGrokVideoProxyPayload(falModelId, input) {
      const target = exports.GROK_VIDEO_ENDPOINT_TO_SPEC[falModelId];
      if (!target)
        return false;
      const spec = exports.GROK_VIDEO_SPECS[target.modelId][target.kind];
      delete input.sync_mode;
      if (spec.duration)
        input.duration = normalizeGrokVideoDuration(spec, input.duration);
      else
        delete input.duration;
      if (spec.resolutions)
        input.resolution = normalizeGrokVideoResolution(spec, input.resolution);
      else
        delete input.resolution;
      if (spec.aspectRatios)
        input.aspect_ratio = normalizeGrokVideoAspectRatio(spec, input.aspect_ratio);
      else
        delete input.aspect_ratio;
      if (target.kind === "r2v") {
        input.reference_image_urls = toUrlArray(input.reference_image_urls).slice(0, exports.GROK_VIDEO_MAX_REFERENCE_IMAGES);
      }
      return true;
    }
  }
});

// ../packages/workflow-contracts/dist/mediaPricing.js
var require_mediaPricing = __commonJS({
  "../packages/workflow-contracts/dist/mediaPricing.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MEDIA_PRICING = exports.normalizeSeedanceResolution = exports.seedance2SentDuration = exports.wan27BillableDuration = exports.imageSizePixels = exports.FAL_IMAGE_SIZE_PRESETS = exports.falMegapixelsCeil = exports.billedInputImagePixels = exports.UNMEASURED_INPUT_IMAGE_PIXELS = exports.INPUT_IMAGE_MEGAPIXEL_PRICED_MODELS = exports.billedInputVideoSeconds = exports.measuredInputVideoSeconds = exports.countInputVideos = exports.countInputImages = exports.collectInputUrls = exports.INPUT_VIDEO_KEYS = exports.INPUT_IMAGE_KEYS = exports.readNumImages = exports.isPayloadView = exports.creditsFromUsd = exports.MEDIA_PRICING_VERIFIED_AT = exports.marketingStudioSentParams = exports.genjutsuSentResolution = exports.GROK_VIDEO_EDIT_UNMEASURED_SOURCE_SECONDS = exports.SEEDANCE_SENT_RESOLUTIONS = exports.seedanceSentResolution = exports.ltxReframeSentResolution = exports.wan27SentResolution = exports.wanFlashSentResolution = exports.GPT_IMAGE_25_2K_MAX_PIXELS = exports.capGptImage2Size = exports.seedream5ProBuilderImageSize = exports.seedream5BuilderImageSize = exports.preparePricingInputs = exports.CONTEXT_ONLY_PRICING_KEYS = exports.roundCostUpToHundredth = void 0;
    var gptImage25_1 = require_gptImage25();
    var ltx25_1 = require_ltx25();
    var minimaxH3_1 = require_minimaxH3();
    var minimaxH3Max_1 = require_minimaxH3Max();
    var geminiOmniFlash_1 = require_geminiOmniFlash();
    var geminiOmniFlashV1_1 = require_geminiOmniFlashV1();
    var flux3_1 = require_flux3();
    var klingO34k_1 = require_klingO34k();
    var klingO3VideoToVideo_1 = require_klingO3VideoToVideo();
    var minimaxH3MaxTurbo_1 = require_minimaxH3MaxTurbo();
    var minimaxH3MultiAngle_1 = require_minimaxH3MultiAngle();
    var wan30_1 = require_wan30();
    var seedance25_1 = require_seedance25();
    var klingV3Turbo_1 = require_klingV3Turbo();
    var klingV3_1 = require_klingV3();
    var minimaxH3MaxExtend_1 = require_minimaxH3MaxExtend();
    var minimaxH3MaxInsert_1 = require_minimaxH3MaxInsert();
    var minimaxH3MaxStyles_1 = require_minimaxH3MaxStyles();
    var seedreamFlash_1 = require_seedreamFlash();
    var flux3Image_1 = require_flux3Image();
    var museImage_1 = require_museImage();
    var grokImagineQuality_1 = require_grokImagineQuality();
    var ideogram45_1 = require_ideogram45();
    var ideogramV4Fast_1 = require_ideogramV4Fast();
    var recraftV41_1 = require_recraftV41();
    var grokVideo_1 = require_grokVideo();
    var roundCostUpToHundredth2 = (cost) => Math.ceil(cost * 100) / 100;
    exports.roundCostUpToHundredth = roundCostUpToHundredth2;
    exports.CONTEXT_ONLY_PRICING_KEYS = ["falModelId", "inputVideoSeconds", "inputImageMegapixels"];
    var finitePositive = (value) => {
      const n = typeof value === "number" ? value : Number.NaN;
      return Number.isFinite(n) && n >= 0 ? n : void 0;
    };
    var preparePricingInputs2 = (inputs = {}, ctx = {}) => {
      const prepared = { ...inputs };
      for (const key of exports.CONTEXT_ONLY_PRICING_KEYS)
        delete prepared[key];
      if (typeof ctx.falModelId === "string" && ctx.falModelId)
        prepared.falModelId = ctx.falModelId;
      const seconds = finitePositive(ctx.measured?.inputVideoSeconds);
      if (seconds !== void 0)
        prepared.inputVideoSeconds = seconds;
      const megapixels = ctx.measured?.inputImageMegapixels;
      if (Array.isArray(megapixels)) {
        const valid = megapixels.map(finitePositive);
        if (valid.every((mp) => mp !== void 0))
          prepared.inputImageMegapixels = valid;
      }
      return prepared;
    };
    exports.preparePricingInputs = preparePricingInputs2;
    var NANO_BANANA_MAX_IMAGES = 4;
    var wantsWebSearch = (inputs) => Boolean(inputs.enable_web_search);
    var nanoBananaOutputs = (inputs) => inputs.limit_generations === false || inputs.limit_generations === "false" ? NANO_BANANA_MAX_IMAGES : (0, exports.readNumImages)(inputs, NANO_BANANA_MAX_IMAGES);
    var wantsHighThinking = (inputs) => trimmed(inputs.thinking_level).toLowerCase() === "high";
    var nanoBananaProCredits = (inputs) => {
      const is4k = trimmed(inputs.resolution).toUpperCase() === "4K";
      const usd = (is4k ? 0.3 : 0.15) + (wantsWebSearch(inputs) ? 0.015 : 0);
      return (0, exports.creditsFromUsd)(usd) * nanoBananaOutputs(inputs);
    };
    var NANO_BANANA_2_MULTIPLIER = { "0.5K": 0.75, "1K": 1, "2K": 1.5, "4K": 2 };
    var nanoBanana2Credits = (inputs) => {
      const tier = trimmed(inputs.resolution).toUpperCase();
      const multiplier = NANO_BANANA_2_MULTIPLIER[tier] ?? 1;
      const usd = 0.08 * multiplier + (wantsWebSearch(inputs) ? 0.015 : 0) + (wantsHighThinking(inputs) ? 2e-3 : 0);
      const legacy = tier === "4K" ? 16 : 8;
      return Math.max(legacy, (0, exports.creditsFromUsd)(usd)) * nanoBananaOutputs(inputs);
    };
    var NANO_BANANA_LITE_USD_PER_INPUT_IMAGE = 403e-6;
    var nanoBananaLiteCredits = (inputs) => {
      const usd = 0.042 + (wantsHighThinking(inputs) ? 0.015 : 0) + NANO_BANANA_LITE_USD_PER_INPUT_IMAGE * (0, exports.countInputImages)(inputs);
      return Math.max(wantsHighThinking(inputs) ? (0, exports.creditsFromUsd)(0.057) : 5, (0, exports.creditsFromUsd)(usd)) * nanoBananaOutputs(inputs);
    };
    var SEEDREAM_MAX_OUTPUTS = 15;
    var seedreamOutputs = (inputs) => (0, exports.isPayloadView)(inputs) ? Math.min(SEEDREAM_MAX_OUTPUTS, (0, exports.readNumImages)(inputs, 6) * clamp(positiveInt(inputs.max_images, 1), 1, 6)) : 1;
    var SEEDREAM_RATIO_TO_FAL = {
      auto: "auto",
      "1:1": "square",
      "16:9": "landscape_16_9",
      "9:16": "portrait_16_9",
      "4:3": "landscape_4_3",
      "3:4": "portrait_4_3",
      "21:9": "landscape_16_9",
      "3:2": "landscape_4_3",
      "2:3": "portrait_4_3"
    };
    var seedream5BuilderImageSize = (resolution, aspectRatio) => {
      const res = isBlank(resolution) ? "1K" : String(resolution);
      const ratioKey = SEEDREAM_RATIO_TO_FAL[isBlank(aspectRatio) ? "auto" : String(aspectRatio)] || "auto";
      if (ratioKey === "auto")
        return res === "4K" ? "auto_3K" : "auto_2K";
      if (res === "1K" && ratioKey === "square")
        return "square";
      if ((res === "2K" || res === "4K") && ratioKey === "square")
        return "square_hd";
      return ratioKey;
    };
    exports.seedream5BuilderImageSize = seedream5BuilderImageSize;
    var seedream5ProBuilderImageSize = (resolution, aspectRatio) => {
      const res = isBlank(resolution) ? "1K" : String(resolution);
      const size = (0, exports.seedream5BuilderImageSize)(res, aspectRatio);
      if (size === "auto_2K" || size === "auto_3K")
        return res === "1K" ? "auto_1K" : "auto_2K";
      return size;
    };
    exports.seedream5ProBuilderImageSize = seedream5ProBuilderImageSize;
    var SEEDREAM_PRO_LOW_TIER_MAX_PIXELS = 1536 * 1536;
    var seedreamProHighTier = (size) => {
      const pixels = (0, exports.imageSizePixels)(size);
      if (pixels === void 0 || pixels === "auto")
        return true;
      return pixels > SEEDREAM_PRO_LOW_TIER_MAX_PIXELS;
    };
    var seedreamProCredits = (inputs, isEdit) => {
      const highTier = (0, exports.isPayloadView)(inputs) ? isBlank(inputs.image_size) || seedreamProHighTier(inputs.image_size) : seedreamProHighTier((0, exports.seedream5ProBuilderImageSize)(inputs.resolution, inputs.aspectRatio));
      const extraInputs = isEdit ? Math.max(0, (0, exports.countInputImages)(inputs) - 1) : 0;
      const falUsd = (highTier ? 0.135 : 0.0675) + 45e-4 * extraInputs;
      const kieHigh = ["2K", "4K"].includes(trimmed(inputs.resolution).toUpperCase());
      const kieUsd = (kieHigh ? 0.07 : 0.035) + 25e-4 * extraInputs;
      return Math.max(5, (0, exports.creditsFromUsd)(Math.max(falUsd, kieUsd))) * seedreamOutputs(inputs);
    };
    var KLING_IMAGE_MAX_OUTPUTS = 9;
    var klingImageOutputs = (inputs) => {
      if (!(0, exports.isPayloadView)(inputs))
        return 1;
      if (trimmed(inputs.result_type).toLowerCase() === "series") {
        return clamp(positiveInt(inputs.series_amount, KLING_IMAGE_MAX_OUTPUTS), 2, KLING_IMAGE_MAX_OUTPUTS);
      }
      return (0, exports.readNumImages)(inputs, KLING_IMAGE_MAX_OUTPUTS);
    };
    var klingV3ImageCredits = (inputs) => (0, exports.creditsFromUsd)(0.028) * klingImageOutputs(inputs);
    var klingO3ImageCredits = (inputs) => {
      const is4k = trimmed(inputs.resolution).toLowerCase() === "4k";
      const perOutput = (0, exports.creditsFromUsd)(is4k ? 0.056 : 0.028);
      return perOutput * Math.max(1, (0, exports.countInputImages)(inputs)) * klingImageOutputs(inputs);
    };
    var QWEN_3_2K_MIN_PIXELS = Math.round(1.25 * 1048576);
    var qwen3Is2kSize = (size) => {
      const pixels = (0, exports.imageSizePixels)(size);
      if (pixels === "auto")
        return true;
      return pixels !== void 0 && pixels > QWEN_3_2K_MIN_PIXELS;
    };
    var qwen3Is2k = (inputs, isEdit) => {
      if (trimmed(inputs.resolution).toLowerCase() === "2k")
        return true;
      if (!isBlank(inputs.image_size))
        return qwen3Is2kSize(inputs.image_size);
      if (!isEdit)
        return false;
      if ((0, exports.isPayloadView)(inputs))
        return true;
      const ratio = trimmed(inputs.aspectRatio);
      return ratio === "" || ratio === "auto";
    };
    var qwenFlat = (usd, maxOutputs) => (inputs) => (0, exports.creditsFromUsd)(usd) * (0, exports.readNumImages)(inputs, maxOutputs);
    var qwen3Credits = (isEdit) => (inputs) => (0, exports.creditsFromUsd)(qwen3Is2k(inputs, isEdit) ? 0.075 : 0.04) * (0, exports.readNumImages)(inputs, 6);
    var GROK_MAX_OUTPUTS = 4;
    var grokEditCredits = (inputs) => {
      const inputCount = Math.max(1, (0, exports.countInputImages)(inputs));
      const usd = 0.02 + 2e-3 * Math.min(3, inputCount);
      const perOutput = Math.max(2.2 * inputCount, (0, exports.creditsFromUsd)(usd));
      return perOutput * (0, exports.readNumImages)(inputs, GROK_MAX_OUTPUTS);
    };
    var grok2BaseCredits = (inputs) => {
      const is2k = trimmed(inputs.resolution).toLowerCase() === "2k";
      const isLow = inputs.quality === "low";
      if (is2k)
        return isLow ? 6 : 8;
      return isLow ? 4 : 6;
    };
    var grok2Credits = (inputs) => grok2BaseCredits(inputs) * (0, exports.readNumImages)(inputs, GROK_MAX_OUTPUTS);
    var grok2EditCredits = (inputs) => grok2Credits(inputs) + Math.min(5, Math.max(1, (0, exports.countInputImages)(inputs)));
    var hasStyleReferences = (inputs) => (0, exports.collectInputUrls)(inputs, ["image_style_references"]).length > 0;
    var LARGEST_FAL_PRESET_PIXELS = 1024 * 1024;
    var sentOrDerivedPixels = (inputs, providerDefaultPreset) => {
      const sent = (0, exports.imageSizePixels)(inputs.image_size);
      if (sent === "auto")
        return "auto";
      if ((0, exports.isPayloadView)(inputs))
        return sent ?? (0, exports.imageSizePixels)(providerDefaultPreset);
      return Math.max(sent ?? 0, LARGEST_FAL_PRESET_PIXELS);
    };
    var kreaTurboCredits = (usdPerMegapixel) => (inputs) => {
      const pixels = sentOrDerivedPixels(inputs, "square_hd");
      const megapixels = (0, exports.falMegapixelsCeil)(pixels === "auto" ? 1048576 : pixels);
      return Math.max(1, (0, exports.creditsFromUsd)(usdPerMegapixel * megapixels)) * (0, exports.readNumImages)(inputs, 4);
    };
    var HUNYUAN_LEGACY_TIER = (inputs) => {
      const res = trimmed(inputs.resolution).toLowerCase();
      if (res === "4k")
        return 144;
      if (res === "2k")
        return 36;
      return 9;
    };
    var hunyuanT2iCredits = (inputs) => {
      const sent = (0, exports.imageSizePixels)(inputs.image_size);
      const pixels = typeof sent === "number" ? sent : 1048576;
      const perImage = Math.max(HUNYUAN_LEGACY_TIER(inputs), (0, exports.creditsFromUsd)(0.1 * (0, exports.falMegapixelsCeil)(pixels)));
      return perImage * (0, exports.readNumImages)(inputs, 4);
    };
    var hunyuanEditCredits = (inputs) => {
      const sent = (0, exports.isPayloadView)(inputs) ? (0, exports.imageSizePixels)(inputs.image_size) : "auto";
      let pixels;
      if (typeof sent === "number") {
        pixels = sent;
      } else {
        const inputCount = Math.max(1, (0, exports.countInputImages)(inputs));
        pixels = Math.min(exports.UNMEASURED_INPUT_IMAGE_PIXELS, Math.max(...(0, exports.billedInputImagePixels)(inputs, inputCount)));
      }
      const perImage = Math.max(HUNYUAN_LEGACY_TIER(inputs), (0, exports.creditsFromUsd)(0.09 * (0, exports.falMegapixelsCeil)(pixels)));
      return perImage * (0, exports.readNumImages)(inputs, 4);
    };
    var HIDREAM_BUILDER_SIZES = {
      auto: { width: 2048, height: 2048 },
      "1:1": { width: 2048, height: 2048 },
      "16:9": { width: 2048, height: 1152 },
      "9:16": { width: 1152, height: 2048 },
      "4:3": { width: 2048, height: 1536 },
      "3:4": { width: 1536, height: 2048 },
      "3:2": { width: 2048, height: 1365 },
      "2:3": { width: 1365, height: 2048 },
      "21:9": { width: 2048, height: 878 }
    };
    var hidreamCredits = (isEdit) => (inputs) => {
      const numImages = (0, exports.readNumImages)(inputs, 4);
      const sent = (0, exports.imageSizePixels)(inputs.image_size);
      const candidates = [];
      if (typeof sent === "number")
        candidates.push(sent);
      else if (sent === "auto")
        candidates.push(2048 * 2048);
      if (!(0, exports.isPayloadView)(inputs)) {
        const size = HIDREAM_BUILDER_SIZES[trimmed(inputs.aspectRatio) || "auto"] ?? HIDREAM_BUILDER_SIZES.auto;
        candidates.push(size.width * size.height);
      } else if (candidates.length === 0) {
        candidates.push(isEdit ? 2048 * 2048 : 1024 * 1024);
      }
      const pixels = Math.max(...candidates);
      const perImage = (0, exports.creditsFromUsd)(0.01 * Math.ceil(Math.round(pixels) / 1e6));
      const legacySize = inputs.image_size;
      const legacyMegapixels = legacySize?.width && legacySize?.height ? legacySize.width * legacySize.height / 1e6 : 4;
      const legacy = (0, exports.roundCostUpToHundredth)(legacyMegapixels * (Number(inputs.num_images) || 1));
      return Math.max(legacy, perImage * numImages);
    };
    var gptTierFromPixels = (pixels, autoTier = "4K") => {
      if (pixels === void 0)
        return void 0;
      if (pixels === "auto")
        return autoTier;
      if (pixels <= 16e5)
        return "1K";
      if (pixels <= 42e5)
        return "2K";
      return "4K";
    };
    var GPT_TIER_RANK = { "1K": 1, "2K": 2, "4K": 3 };
    var maxGptTier = (...tiers) => tiers.filter((t) => Boolean(t)).sort((a, b) => GPT_TIER_RANK[b] - GPT_TIER_RANK[a])[0] ?? "1K";
    var gptImage25_2 = require_gptImage25();
    Object.defineProperty(exports, "capGptImage2Size", { enumerable: true, get: function() {
      return gptImage25_2.capGptImageSizeToTier;
    } });
    var GPT_15_USD = {
      low: { square: 9e-3, other: 0.013 },
      medium: { square: 0.034, other: 0.051 },
      high: { square: 0.133, other: 0.2 }
    };
    var gpt15Quality = (value) => value === "low" || value === "medium" ? value : "high";
    var gpt15BuilderIsSquare = (aspectRatio) => {
      const ratio = trimmed(aspectRatio) || "1:1";
      return ratio !== "16:9" && ratio !== "9:16";
    };
    var gpt15SentIsSquare = (size) => {
      if (isBlank(size))
        return void 0;
      if (typeof size === "string" && size.trim().toLowerCase() === "auto")
        return false;
      if (typeof size === "object" && size) {
        const { width, height } = size;
        return Number(width) === Number(height);
      }
      const match = /^(\d+)\s*[x×]\s*(\d+)$/i.exec(String(size).trim());
      return match ? match[1] === match[2] : false;
    };
    var gpt15IsSquare = (inputs, providerDefaultSquare) => {
      const sent = gpt15SentIsSquare(inputs.image_size);
      if ((0, exports.isPayloadView)(inputs))
        return sent ?? providerDefaultSquare;
      const built = gpt15BuilderIsSquare(inputs.aspectRatio);
      return sent === void 0 ? built : sent && built;
    };
    var gpt15Credits = (inputs) => {
      const usd = GPT_15_USD[gpt15Quality(inputs.quality)][gpt15IsSquare(inputs, true) ? "square" : "other"];
      return Math.max(2, (0, exports.creditsFromUsd)(usd)) * (0, exports.readNumImages)(inputs, 4);
    };
    var gpt15EditLegacy = (inputs) => {
      const quality = inputs.quality || "high";
      const inputFidelity = inputs.input_fidelity || "high";
      const res = inputs.aspectRatio || "1:1";
      const imageTokenCost = (inputFidelity === "low" ? 135 : 3050) / 1e3 * 8e-3;
      const is1024 = res === "1:1" || res === "1024x1024" || res === "auto";
      let genCost;
      if (quality === "low")
        genCost = is1024 ? 9e-3 : 0.013;
      else if (quality === "medium")
        genCost = is1024 ? 0.034 : 0.051;
      else
        genCost = is1024 ? 0.133 : 0.2;
      return (0, exports.roundCostUpToHundredth)((imageTokenCost + genCost) * 100);
    };
    var gpt15EditCredits = (inputs) => {
      const tokensPerImage = inputs.input_fidelity === "low" ? 135 : 3050;
      const inputUsd = Math.max(1, (0, exports.countInputImages)(inputs)) * (tokensPerImage / 1e3) * 8e-3;
      const genUsd = GPT_15_USD[gpt15Quality(inputs.quality)][gpt15IsSquare(inputs, false) ? "square" : "other"];
      return Math.max(gpt15EditLegacy(inputs), (0, exports.creditsFromUsd)(genUsd + inputUsd)) * (0, exports.readNumImages)(inputs, 4);
    };
    var GPT_2_USD = {
      low: { "1K": 0.01, "2K": 0.01, "4K": 0.02 },
      medium: { "1K": 0.06, "2K": 0.07, "4K": 0.101 },
      high: { "1K": 0.211, "2K": 0.242, "4K": 0.401 }
    };
    var GPT_2_LEGACY = {
      "1:1": [0.01, 0.06, 0.22],
      auto: [0.01, 0.06, 0.22],
      "16:9": [0.01, 0.04, 0.16],
      "9:16": [0.01, 0.05, 0.17],
      "4:3": [0.01, 0.04, 0.15],
      "3:4": [0.01, 0.05, 0.17],
      "3:2": [0.01, 0.04, 0.16],
      "2:3": [0.01, 0.05, 0.17],
      "21:9": [0.02, 0.11, 0.41]
    };
    var gpt2Legacy = (inputs) => {
      const q = inputs.quality || "medium";
      const row = GPT_2_LEGACY[inputs.aspectRatio || "1:1"] || GPT_2_LEGACY["1:1"];
      const usd = q === "low" ? row[0] : q === "medium" ? row[1] : row[2];
      return (0, exports.roundCostUpToHundredth)(usd * 100);
    };
    var gpt2Quality = (inputs) => {
      const q = inputs.quality;
      if (q === "low" || q === "medium" || q === "high")
        return q;
      return (0, exports.isPayloadView)(inputs) ? "high" : "medium";
    };
    var gpt2BuilderTier = (inputs, autoTier) => {
      const ratio = trimmed(inputs.aspectRatio) || "auto";
      const res = trimmed(inputs.resolution).toUpperCase();
      if (ratio === "auto" && (res === "" || res === "1K"))
        return autoTier;
      if (res === "4K")
        return "4K";
      if (res === "2K")
        return "2K";
      return "1K";
    };
    var gpt2AutoTier = (inputs, isEdit) => {
      if (!isEdit)
        return "4K";
      const pixels = (0, exports.billedInputImagePixels)(inputs, Math.max(1, (0, exports.countInputImages)(inputs)));
      return gptTierFromPixels(Math.max(...pixels)) ?? "4K";
    };
    var gpt2Credits = (isEdit) => (inputs) => {
      const autoTier = gpt2AutoTier(inputs, isEdit);
      const sentTier = gptTierFromPixels((0, exports.imageSizePixels)(inputs.image_size), autoTier);
      const tier = (0, exports.isPayloadView)(inputs) ? sentTier ?? (isEdit ? autoTier : "1K") : maxGptTier(sentTier, gpt2BuilderTier(inputs, isEdit ? autoTier : "1K"));
      const inputUsd = isEdit ? 0.012 * Math.max(1, (0, exports.countInputImages)(inputs)) : 0;
      const perImage = Math.max(gpt2Legacy(inputs), (0, exports.creditsFromUsd)(GPT_2_USD[gpt2Quality(inputs)][tier] + inputUsd));
      return perImage * (0, exports.readNumImages)(inputs, 4);
    };
    exports.GPT_IMAGE_25_2K_MAX_PIXELS = 43e5;
    var gpt25TierFromPixels = (pixels) => {
      if (pixels === void 0)
        return void 0;
      if (pixels === "auto")
        return "4K";
      if (pixels <= 16e5)
        return "1K";
      if (pixels <= exports.GPT_IMAGE_25_2K_MAX_PIXELS)
        return "2K";
      return "4K";
    };
    var gpt25Credits = (isEdit) => (inputs) => {
      const sentTier = gpt25TierFromPixels((0, exports.imageSizePixels)(inputs.image_size));
      const nodeTier = (0, exports.isPayloadView)(inputs) ? void 0 : (0, gptImage25_1.normalizeGptImage25Resolution)(inputs.resolution);
      const defaultTier = sentTier === void 0 && nodeTier === void 0 ? isEdit ? "4K" : "1K" : void 0;
      const tier = maxGptTier(sentTier, nodeTier, defaultTier);
      const extraRefs = isEdit ? Math.max(0, (0, exports.countInputImages)(inputs) - 1) : 0;
      const usd = gptImage25_1.GPT_IMAGE_25_USD[tier][(0, gptImage25_1.billedGptImage25Quality)(inputs.quality)] + 0.012 * extraRefs;
      return (0, exports.creditsFromUsd)(usd) * (0, exports.readNumImages)(inputs, 10);
    };
    var FLUX_2_MAX_OUTPUT_PIXELS = 4 * 1048576;
    var flux2Usd = (outputPixels, inputPixels) => {
      const outputMegapixels = (0, exports.falMegapixelsCeil)(Math.min(FLUX_2_MAX_OUTPUT_PIXELS, outputPixels));
      const inputMegapixels = inputPixels.reduce((sum, px) => sum + (0, exports.falMegapixelsCeil)(px), 0);
      return 0.03 + 0.015 * (outputMegapixels - 1) + 0.015 * inputMegapixels;
    };
    var flux2ProCredits = (inputs) => {
      const pixels = sentOrDerivedPixels(inputs, "landscape_4_3");
      return Math.max(6, (0, exports.creditsFromUsd)(flux2Usd(pixels === "auto" ? FLUX_2_MAX_OUTPUT_PIXELS : pixels, [])));
    };
    var flux2ProEditCredits = (inputs) => {
      const inputPixels = (0, exports.billedInputImagePixels)(inputs, Math.max(1, (0, exports.countInputImages)(inputs)));
      const sent = (0, exports.isPayloadView)(inputs) ? (0, exports.imageSizePixels)(inputs.image_size) : void 0;
      const outputPixels = typeof sent === "number" ? sent : Math.max(...inputPixels);
      return Math.max(6, (0, exports.creditsFromUsd)(flux2Usd(outputPixels, inputPixels)));
    };
    var IDEOGRAM_USD_PER_MP = { TURBO: 75e-4, BALANCED: 0.015, QUALITY: 0.025 };
    var IDEOGRAM_LEGACY = { TURBO: 3, BALANCED: 6, QUALITY: 10 };
    var IDEOGRAM_MAX_T2I_PIXELS = 3840 * 3840;
    var ideogramSpeed = (inputs) => {
      const speed = trimmed(inputs.rendering_speed).toUpperCase();
      return IDEOGRAM_USD_PER_MP[speed] !== void 0 ? speed : "BALANCED";
    };
    var ideogramCredits = (isImageToImage) => (inputs) => {
      const speed = ideogramSpeed(inputs);
      let pixels;
      const sent = isImageToImage && !(0, exports.isPayloadView)(inputs) ? void 0 : (0, exports.imageSizePixels)(inputs.image_size);
      const nodeAuto = !(0, exports.isPayloadView)(inputs) && isImageToImage && (trimmed(inputs.aspectRatio) === "" || trimmed(inputs.aspectRatio) === "auto");
      const followsInput = isImageToImage && (sent === "auto" || sent === void 0 && ((0, exports.isPayloadView)(inputs) || nodeAuto));
      if (followsInput) {
        pixels = Math.min(exports.UNMEASURED_INPUT_IMAGE_PIXELS, (0, exports.billedInputImagePixels)(inputs, 1)[0]);
      } else if (sent === "auto") {
        pixels = IDEOGRAM_MAX_T2I_PIXELS;
      } else {
        const derived = sentOrDerivedPixels(inputs, "square_hd");
        pixels = derived === "auto" ? IDEOGRAM_MAX_T2I_PIXELS : derived;
      }
      const perImage = Math.max(IDEOGRAM_LEGACY[speed], (0, exports.creditsFromUsd)(IDEOGRAM_USD_PER_MP[speed] * (0, exports.falMegapixelsCeil)(pixels)));
      return perImage * (0, exports.readNumImages)(inputs, 4);
    };
    var lumaCredits = (baseUsd, legacy) => (inputs) => Math.max(legacy, (0, exports.creditsFromUsd)(baseUsd + 3e-3 * (0, exports.countInputImages)(inputs)));
    var LTX_TIER_RANK = { "1080p": 1, "1440p": 2, "2160p": 3 };
    var LTX_BUILDER_ALIASES = {
      "0.5K": "1080p",
      "1K": "1080p",
      "2K": "1440p",
      "4K": "2160p",
      "4k": "2160p"
    };
    var ltxTier = (raw) => {
      const value = trimmed(raw);
      const lower = value.toLowerCase();
      const legacy = lower === "2160p" ? "2160p" : lower === "1440p" ? "1440p" : "1080p";
      const sent = value === "1080p" || value === "1440p" || value === "2160p" ? value : LTX_BUILDER_ALIASES[value] ?? "1080p";
      return LTX_TIER_RANK[sent] >= LTX_TIER_RANK[legacy] ? sent : legacy;
    };
    var LTX_PRO_USD = { "1080p": 0.08, "1440p": 0.16, "2160p": 0.32 };
    var LTX_FAST_USD = { "1080p": 0.06, "1440p": 0.12, "2160p": 0.24 };
    var LTX_PRO_LEGACY_CPS = { "1080p": 6, "1440p": 12, "2160p": 24 };
    var LTX_FAST_LEGACY_CPS = { "1080p": 4, "1440p": 8, "2160p": 16 };
    var ltxDuration = (raw) => {
      const n = Number(raw);
      return Number.isFinite(n) && n > 0 ? n : 6;
    };
    var ltx23Credits = (usd, legacyCps) => (inputs) => {
      const tier = ltxTier(inputs.resolution);
      const seconds = ltxDuration(inputs.duration);
      return Math.max(legacyCps[tier] * seconds, (0, exports.creditsFromUsd)(usd[tier] * seconds));
    };
    var LTX_REFRAME_MAX_SOURCE_SECONDS = 60;
    var ltxReframeCredits = (inputs) => {
      const is720 = (0, exports.isPayloadView)(inputs) ? trimmed(inputs.resolution) === "720p" : (0, exports.ltxReframeSentResolution)(inputs.resolution) === "720p";
      const seconds = (0, exports.billedInputVideoSeconds)(inputs, LTX_REFRAME_MAX_SOURCE_SECONDS, true);
      const legacy = (trimmed(inputs.resolution).toLowerCase() === "720p" ? 10 : 20) * (Number(inputs.duration) || 10);
      return Math.max(legacy, (0, exports.creditsFromUsd)((is720 ? 0.1 : 0.2) * seconds));
    };
    var wanFlashSentResolution = (raw) => {
      const res = trimmed(raw);
      return res === "720p" || res === "480p" ? "720p" : "1080p";
    };
    exports.wanFlashSentResolution = wanFlashSentResolution;
    var wan27SentResolution = (raw) => trimmed(raw).toLowerCase() === "720p" ? "720p" : "1080p";
    exports.wan27SentResolution = wan27SentResolution;
    var ltxReframeSentResolution = (raw) => trimmed(raw).toLowerCase() === "720p" ? "720p" : "1080p";
    exports.ltxReframeSentResolution = ltxReframeSentResolution;
    var wanFlashCredits = (inputs) => {
      const res = trimmed(inputs.resolution);
      const sentIs720 = (0, exports.isPayloadView)(inputs) ? res === "720p" : (0, exports.wanFlashSentResolution)(res) === "720p";
      const seconds = Number(inputs.duration) > 0 ? Number(inputs.duration) : 5;
      const legacyRes = (0, exports.isPayloadView)(inputs) ? res.toLowerCase() : (0, exports.wanFlashSentResolution)(res);
      const legacyCps = legacyRes === "1080p" ? 8 : legacyRes === "720p" || res === "" ? 5 : 3;
      return Math.max(legacyCps * seconds, (0, exports.creditsFromUsd)((sentIs720 ? 0.05 : 0.075) * seconds));
    };
    var WAN27_MAX_REFERENCE_VIDEO_SECONDS = 30;
    var WAN27_MAX_EDIT_SOURCE_SECONDS = 10;
    var wan27Mode = (inputs) => {
      if ((0, exports.isPayloadView)(inputs)) {
        const endpoint = String(inputs.falModelId);
        if (endpoint.includes("reference-to-video"))
          return "reference";
        if (endpoint.includes("/edit-video"))
          return "edit";
        return "generate";
      }
      const reference = inputs.mode === "reference" || inputs.wan_mode === "reference" || inputs.video_usage === "reference";
      if (reference)
        return "reference";
      const continueVideo = inputs.video_usage === "continue" || inputs.video_usage === "image-to-video";
      const hasVideo = (0, exports.collectInputUrls)(inputs, ["video_url", "video", "video_urls", "videos"]).length > 0;
      return !continueVideo && hasVideo ? "edit" : "generate";
    };
    var wan27Credits = (inputs) => {
      const sent720 = (0, exports.isPayloadView)(inputs) ? trimmed(inputs.resolution) === "720p" : (0, exports.wan27SentResolution)(inputs.resolution) === "720p";
      const usdPerSecond = sent720 ? 0.1 : 0.15;
      const parsed = Number(inputs.duration);
      const requested = Number.isFinite(parsed) && parsed > 0 ? Math.trunc(parsed) : 0;
      const mode = wan27Mode(inputs);
      let seconds;
      if (mode === "reference") {
        const videos = (0, exports.countInputVideos)(inputs);
        const refSeconds = videos > 0 ? (0, exports.billedInputVideoSeconds)(inputs, videos * WAN27_MAX_REFERENCE_VIDEO_SECONDS, true) : 0;
        seconds = Math.min(10, requested || 5) + refSeconds;
      } else if (mode === "edit") {
        seconds = requested > 0 ? Math.min(WAN27_MAX_EDIT_SOURCE_SECONDS, requested) : Math.min(WAN27_MAX_EDIT_SOURCE_SECONDS, (0, exports.billedInputVideoSeconds)(inputs, WAN27_MAX_EDIT_SOURCE_SECONDS, true));
      } else {
        seconds = Math.min(15, requested || 5);
      }
      const legacy = (0, exports.roundCostUpToHundredth)((trimmed(inputs.resolution).toLowerCase() === "720p" ? 10 : 15) * (0, exports.wan27BillableDuration)(inputs, inputs.falModelId));
      return Math.max(legacy, (0, exports.creditsFromUsd)(usdPerSecond * seconds));
    };
    var wan30Credits = (tier) => (inputs) => {
      const raw = inputs.duration;
      const duration = (0, exports.isPayloadView)(inputs) && (isBlank(raw) || raw === "auto") ? 30 : raw;
      const refSeconds = (0, exports.countInputVideos)(inputs) > 0 ? (0, exports.billedInputVideoSeconds)(inputs, wan30_1.WAN30_MAX_REFERENCE_VIDEO_SECONDS, true) : 0;
      return (0, wan30_1.wan30CreditCost)(tier, inputs.resolution, duration, refSeconds);
    };
    var SEEDANCE_DIMS = {
      "480p": { width: 854, height: 480 },
      "720p": { width: 1280, height: 720 },
      "1080p": { width: 1920, height: 1080 }
    };
    var seedanceSentResolution = (raw, supported) => {
      if (isBlank(raw))
        return "720p";
      const value = trimmed(raw).toLowerCase();
      if (supported.includes(value))
        return value;
      const mapped = IMAGE_TIER_TO_P[value];
      if (mapped !== void 0)
        return supported.includes(mapped) ? mapped : supported[0];
      return "720p";
    };
    exports.seedanceSentResolution = seedanceSentResolution;
    var seedance15Legacy = (inputs) => {
      const resolution = (0, exports.normalizeSeedanceResolution)(inputs.resolution, ["480p", "720p", "1080p"]);
      const duration = Number(inputs.duration) || 5;
      const { width, height } = SEEDANCE_DIMS[resolution] || SEEDANCE_DIMS["720p"];
      const usd = width * height * 24 * duration / 1024 / 1e6 * (inputs.generate_audio !== false ? 2.4 : 1.2);
      return (0, exports.roundCostUpToHundredth)(usd * 100);
    };
    var seedance15Credits = (inputs) => {
      const resolution = (0, exports.seedanceSentResolution)(inputs.resolution, ["480p", "720p", "1080p"]);
      const duration = Number(inputs.duration) > 0 ? Number(inputs.duration) : 5;
      const { width, height } = SEEDANCE_DIMS[resolution];
      const usd = width * height * 24 * duration / 1024 / 1e6 * (inputs.generate_audio !== false ? 2.4 : 1.2);
      return Math.max(seedance15Legacy(inputs), (0, exports.creditsFromUsd)(usd));
    };
    exports.SEEDANCE_SENT_RESOLUTIONS = {
      "1.5": ["480p", "720p", "1080p"],
      reference: ["480p", "720p", "1080p", "4k"],
      fast: ["480p", "720p"],
      mini: ["480p", "720p"]
    };
    var SEEDANCE_2_MAX_INPUT_VIDEO_SECONDS = 15;
    var SEEDANCE_2_MAX_DURATION = 15;
    var SEEDANCE_2_USD_PER_SECOND = {
      reference: { "480p": 0.1442, "720p": 0.3034, "1080p": 0.682, "4k": 1.5552 },
      fast: { "480p": 0.1154, "720p": 0.2419 },
      mini: { "480p": 0.0721, "720p": 0.1547 }
    };
    var seedance2OutputSeconds = (inputs) => {
      const raw = inputs.duration;
      if ((0, exports.isPayloadView)(inputs) && (isBlank(raw) || raw === "auto"))
        return SEEDANCE_2_MAX_DURATION;
      const n = Number((0, exports.seedance2SentDuration)(raw));
      return Number.isFinite(n) && n > 0 ? n : 5;
    };
    var seedance2Credits = (rates, legacy) => (inputs) => {
      const resolution = (0, exports.seedanceSentResolution)(inputs.resolution, Object.keys(rates));
      const usdPerSecond = rates[resolution] ?? rates["720p"];
      const output = seedance2OutputSeconds(inputs);
      const hasVideo = (0, exports.countInputVideos)(inputs) > 0;
      const input = (0, exports.billedInputVideoSeconds)(inputs, SEEDANCE_2_MAX_INPUT_VIDEO_SECONDS, hasVideo);
      const usd = hasVideo ? usdPerSecond * (input + output) * 0.6 : usdPerSecond * output;
      return Math.max(legacy(inputs), (0, exports.creditsFromUsd)(usd));
    };
    var seedance2RefLegacy = (inputs) => {
      const resolution = (0, exports.normalizeSeedanceResolution)(inputs.resolution, ["480p", "720p", "1080p"]);
      const parsed = Number(inputs.duration);
      const duration = Number.isFinite(parsed) && parsed > 0 ? parsed : 5;
      const { width, height } = SEEDANCE_DIMS[resolution] || SEEDANCE_DIMS["720p"];
      const usdPerSecond = width * height * 24 / 1024 * 0.014 / 1e3;
      const hasVideo = Boolean(inputs.video_url || inputs.video_urls);
      return (0, exports.roundCostUpToHundredth)(usdPerSecond * duration * (hasVideo ? 0.6 : 1) * 100);
    };
    var seedance25OutputFollowsSource = (inputs) => {
      if ((0, exports.isPayloadView)(inputs))
        return String(inputs.falModelId).endsWith("/video-edit");
      const mode = trimmed(inputs.seedance_mode ?? inputs.mode).toLowerCase();
      if (["vtv", "video-edit", "edit"].includes(mode))
        return true;
      if (["rtv", "r2v", "reference", "itv", "i2v", "image", "ttv", "t2v", "text"].includes(mode))
        return false;
      return (0, exports.collectInputUrls)(inputs, ["video_url", "video"]).length > 0;
    };
    var seedance25Resolution = (inputs) => {
      if ((0, exports.isPayloadView)(inputs))
        return trimmed(inputs.resolution);
      return trimmed(inputs.resolution).toLowerCase() === "480p" ? "480p" : "720p";
    };
    var seedance25InputSeconds = (inputs) => {
      const measured = (0, exports.measuredInputVideoSeconds)(inputs);
      if (measured !== void 0)
        return measured;
      const videos = Math.min(seedance25_1.SEEDANCE25_MAX_REF_VIDEOS, (0, exports.countInputVideos)(inputs));
      if (videos === 0)
        return void 0;
      return (0, exports.isPayloadView)(inputs) ? seedance25_1.SEEDANCE25_MAX_INPUT_VIDEO_SECONDS : videos * seedance25_1.SEEDANCE25_MAX_INPUT_VIDEO_SECONDS;
    };
    var seedance25Credits = (inputs) => (0, seedance25_1.seedance25CreditCost)({
      resolution: seedance25Resolution(inputs),
      duration: inputs.duration,
      dynamicInputs: inputs,
      inputVideoDuration: seedance25InputSeconds(inputs),
      durationLeftToModel: (0, exports.isPayloadView)(inputs) && (isBlank(inputs.duration) || inputs.duration === "auto"),
      outputFollowsSource: seedance25OutputFollowsSource(inputs)
    });
    var KLING_V3_RANK = { standard: 1, pro: 2, "4k": 3 };
    var klingV3Tier = (inputs) => {
      const fromResolution = trimmed(inputs.resolution).toLowerCase();
      const nodeTier = fromResolution === "4k" ? "4k" : fromResolution === "pro" ? "pro" : "standard";
      if (!(0, exports.isPayloadView)(inputs))
        return nodeTier;
      const endpoint = String(inputs.falModelId);
      const endpointTier = endpoint.includes("/4k/") ? "4k" : endpoint.includes("/pro/") ? "pro" : "standard";
      return KLING_V3_RANK[endpointTier] >= KLING_V3_RANK[nodeTier] ? endpointTier : nodeTier;
    };
    var hasKlingVoiceControl = (inputs) => {
      if (!isBlank(inputs.voice_id))
        return true;
      if (Array.isArray(inputs.voice_ids) ? inputs.voice_ids.length > 0 : !isBlank(inputs.voice_ids))
        return true;
      return Array.isArray(inputs.elements) && inputs.elements.some((el) => Boolean(el && typeof el === "object" && !isBlank(el.voice_id)));
    };
    var KLING_V3_USD_PER_SECOND = {
      standard: { silent: 0.084, audio: 0.126, voice: 0.154 },
      pro: { silent: 0.112, audio: 0.168, voice: 0.196 }
    };
    var klingV3Credits = (inputs) => {
      const tier = klingV3Tier(inputs);
      const duration = (0, klingV3_1.klingV3BillableSeconds)(inputs.duration);
      const generateAudio = inputs.generate_audio !== false;
      let usdPerSecond;
      if (tier === "4k") {
        usdPerSecond = 0.42;
      } else {
        const rates = KLING_V3_USD_PER_SECOND[tier];
        usdPerSecond = hasKlingVoiceControl(inputs) ? rates.voice : generateAudio ? rates.audio : rates.silent;
      }
      return Math.max((0, exports.creditsFromUsd)(usdPerSecond * duration), (0, klingV3_1.klingV3CreditCostFromInputs)(inputs));
    };
    var klingO3EditSourceSeconds = (inputs) => (0, exports.measuredInputVideoSeconds)(inputs);
    var klingO34kKindFromEndpoint = (endpoint) => {
      if (endpoint.includes("/video-to-video/edit"))
        return "edit";
      if (endpoint.includes("/video-to-video/reference"))
        return "v2vRef";
      if (endpoint.includes("/reference-to-video"))
        return "r2v";
      if (endpoint.includes("/image-to-video"))
        return "i2v";
      if (endpoint.includes("/text-to-video"))
        return "t2v";
      return void 0;
    };
    var klingO34kCredits = (inputs) => {
      const kind = (0, exports.isPayloadView)(inputs) ? klingO34kKindFromEndpoint(String(inputs.falModelId)) : void 0;
      if (kind === "v2vRef") {
        return (0, klingO3VideoToVideo_1.klingO3VideoToVideoCreditCost)({
          variant: "4k-reference",
          duration: inputs.duration,
          dynamicInputs: inputs,
          sourceSeconds: klingO3EditSourceSeconds(inputs),
          durationLeftToModel: isBlank(inputs.duration) || inputs.duration === "auto"
        });
      }
      return (0, klingO34k_1.klingO34kCreditCost)({
        duration: inputs.duration,
        generateAudio: Boolean(inputs.generate_audio),
        kind,
        dynamicInputs: inputs,
        sourceSeconds: klingO3EditSourceSeconds(inputs)
      });
    };
    var sentProviderResolution = (inputs) => (0, exports.isPayloadView)(inputs) ? trimmed(inputs.resolution) : void 0;
    var grokVideoCredits = (inputs) => {
      const spec = grokVideoSpecCredits("grok-video")(inputs);
      const endpointKind = (0, exports.isPayloadView)(inputs) ? grokVideo_1.GROK_VIDEO_ENDPOINT_TO_SPEC[String(inputs.falModelId)]?.kind : void 0;
      const kind = endpointKind ?? (0, grokVideo_1.resolveGrokVideoKind)({
        modelId: "grok-video",
        imageUrls: inputs.image_urls ?? inputs.image ?? inputs.imageUrls,
        dynamicInputs: inputs
      });
      if (kind !== "i2v")
        return spec;
      const legacyCps = (inputs.resolution || "720p").toString().toLowerCase() === "720p" ? 7 : 5;
      return Math.max(legacyCps * (Number(inputs.duration) || 6), spec);
    };
    var grokVideoSpecCredits = (modelId) => (inputs) => (0, grokVideo_1.grokVideoCreditCost)({
      modelId,
      falModelId: inputs.falModelId,
      imageUrls: inputs.image_urls ?? inputs.image ?? inputs.imageUrls,
      dynamicInputs: inputs
    });
    exports.GROK_VIDEO_EDIT_UNMEASURED_SOURCE_SECONDS = 60;
    var GROK_VIDEO_V1_720P_CREDITS_PER_SECOND = 7;
    var grokVideoSourceMeasuredCredits = (modelId) => (inputs) => {
      const mainPrice = grokVideoSpecCredits(modelId)(inputs);
      if (modelId === "grok-video-extend" && (0, exports.measuredInputVideoSeconds)(inputs) === void 0)
        return mainPrice;
      const maxSource = modelId === "grok-video-extend" ? grokVideo_1.GROK_VIDEO_EXTEND_INPUT_MAX_SECONDS : exports.GROK_VIDEO_EDIT_UNMEASURED_SOURCE_SECONDS;
      const source = (0, exports.billedInputVideoSeconds)(inputs, maxSource);
      if (source <= 0)
        return mainPrice;
      let floorCredits;
      if (modelId === "grok-video-extend") {
        const spec = (0, grokVideo_1.grokVideoSpec)("grok-video-extend", "extend");
        const extension = (spec && (0, grokVideo_1.normalizeGrokVideoDuration)(spec, inputs.duration)) ?? 0;
        floorCredits = GROK_VIDEO_V1_720P_CREDITS_PER_SECOND * (source + grokVideo_1.GROK_VIDEO_EXTEND_OUTPUT_MARGIN_SECONDS + extension) + source;
      } else {
        floorCredits = mainPrice - grokVideo_1.GROK_VIDEO_EDIT_INPUT_BILLED_SECONDS + source;
      }
      return Math.max(mainPrice, Math.ceil(floorCredits - 1e-9));
    };
    var GENJUTSU_LIST_USD_PER_SECOND = { "480p": 0.318, "720p": 0.681, "1080p": 1.632 };
    var GENJUTSU_MAX_SOURCE_SECONDS = 30;
    var genjutsuSentResolution = (raw) => {
      const r = trimmed(raw).toLowerCase();
      if (r === "480p" || r === "480")
        return "480p";
      if (r === "1080p" || r === "1080" || r === "1k")
        return "1080p";
      return "720p";
    };
    exports.genjutsuSentResolution = genjutsuSentResolution;
    var genjutsuListCredits = (inputs) => {
      const measured = (0, exports.measuredInputVideoSeconds)(inputs);
      const seconds = measured === void 0 ? GENJUTSU_MAX_SOURCE_SECONDS : Math.max(1, Math.ceil(Math.min(GENJUTSU_MAX_SOURCE_SECONDS, measured)));
      const usd = GENJUTSU_LIST_USD_PER_SECOND[(0, exports.genjutsuSentResolution)(inputs.resolution)] * seconds;
      return Math.max(genjutsuCreditCost(inputs), (0, exports.creditsFromUsd)(usd));
    };
    var CINEMA_STUDIO_MAX_REF_VIDEO_SECONDS = 30.2;
    var cinemaStudioListCredits = (inputs) => {
      const is480 = trimmed(inputs.resolution).toLowerCase() === "480p";
      const output = boundedVideoDuration(inputs.duration, 5, 4, 30);
      const videos = Math.min(10, (0, exports.countInputVideos)(inputs));
      const input = videos > 0 ? (0, exports.billedInputVideoSeconds)(inputs, videos * CINEMA_STUDIO_MAX_REF_VIDEO_SECONDS, true) : 0;
      const dims = is480 ? { width: 854, height: 480 } : { width: 1280, height: 720 };
      const tokens = Math.ceil((input + output) * dims.width * dims.height * 24 / 1024);
      const usd = tokens * (videos > 0 ? 0.01284 : 0.0214) / 1e3;
      return Math.max(cinemaStudio4CreditCost(inputs), (0, exports.creditsFromUsd)(usd));
    };
    var MARKETING_STUDIO_USD = {
      "1k:low": 0.0162,
      "1k:medium": 0.06412,
      "1k:high": 0.22177,
      "2k:low": 0.0222,
      "2k:medium": 0.11824,
      "2k:high": 0.43942,
      "4k:low": 0.03118,
      "4k:medium": 0.19,
      "4k:high": 0.7219
    };
    var sentBoolean = (value, fallback) => {
      if (typeof value === "boolean")
        return value;
      if (value === "false" || value === "0")
        return false;
      if (value === "true" || value === "1")
        return true;
      return fallback;
    };
    var marketingStudioSentParams = (inputs) => {
      const enhance = sentBoolean(inputs.enhance_prompt ?? inputs.enhancePrompt, false);
      const res = trimmed(inputs.resolution).toLowerCase();
      const resolution = ["1k", "2k", "4k"].includes(res) ? res : "2k";
      const rawQuality = trimmed(inputs.quality).toLowerCase();
      const quality = enhance ? "high" : ["low", "medium", "high"].includes(rawQuality) ? rawQuality : "high";
      return { resolution, quality, enhance };
    };
    exports.marketingStudioSentParams = marketingStudioSentParams;
    var marketingStudioCredits = (inputs) => {
      const { resolution, quality, enhance } = (0, exports.marketingStudioSentParams)(inputs);
      const usd = MARKETING_STUDIO_USD[`${resolution}:${quality}`] * (enhance ? 1.1 : 1);
      return Math.max(2, (0, exports.creditsFromUsd)(usd));
    };
    var soulTierAndBatch = (inputs) => {
      const res = trimmed(inputs.resolution).toLowerCase();
      return {
        hd: res === "1080p" || res === "1080" || res === "2k",
        batch: Number(inputs.batch_size ?? inputs.batchSize) === 4 ? 4 : 1
      };
    };
    var soul2Credits = (inputs) => {
      const { hd, batch } = soulTierAndBatch(inputs);
      return (hd ? 4 : 2) * batch;
    };
    var soulCinemaCredits = (inputs) => {
      const { hd, batch } = soulTierAndBatch(inputs);
      return Math.max(hd ? 4 : 2, (0, exports.creditsFromUsd)(hd ? 0.1875 : 0.0938)) * batch;
    };
    exports.MEDIA_PRICING_VERIFIED_AT = "2026-10-02";
    var creditsFromUsd = (usd) => Math.ceil(Math.round(usd * 100 * 1e6) / 1e6);
    exports.creditsFromUsd = creditsFromUsd;
    var isPayloadView = (inputs) => typeof inputs.falModelId === "string" && inputs.falModelId.length > 0;
    exports.isPayloadView = isPayloadView;
    var isBlank = (value) => value === void 0 || value === null || value === "";
    var trimmed = (value) => isBlank(value) ? "" : String(value).trim();
    var positiveInt = (value, fallback) => {
      const n = Number(value);
      return Number.isFinite(n) && n >= 1 ? Math.trunc(n) : fallback;
    };
    var clamp = (n, min, max) => Math.min(max, Math.max(min, n));
    var readNumImages = (inputs, providerMax) => (0, exports.isPayloadView)(inputs) ? clamp(positiveInt(inputs.num_images, 1), 1, providerMax) : 1;
    exports.readNumImages = readNumImages;
    var collectUrlStrings = (value, into) => {
      if (typeof value === "string") {
        const url = value.trim();
        if (url)
          into.add(url);
      } else if (Array.isArray(value)) {
        value.forEach((entry) => collectUrlStrings(entry, into));
      } else if (value && typeof value === "object") {
        const record = value;
        collectUrlStrings(record.image_url, into);
        collectUrlStrings(record.url, into);
      }
    };
    exports.INPUT_IMAGE_KEYS = [
      "image_urls",
      "image_url",
      "image",
      "images",
      "reference_image_urls",
      "reference_image_url",
      "reference_images",
      "reference_image",
      "image_style_references",
      "start_image",
      "start_image_url",
      "end_image",
      "end_image_url"
    ];
    exports.INPUT_VIDEO_KEYS = [
      "video_url",
      "video_urls",
      "video",
      "videos",
      "reference_video_url",
      "reference_video_urls",
      "reference_video",
      "reference_videos"
    ];
    var collectInputUrls = (inputs, keys) => {
      const urls = /* @__PURE__ */ new Set();
      for (const key of keys)
        collectUrlStrings(inputs[key], urls);
      return [...urls];
    };
    exports.collectInputUrls = collectInputUrls;
    var countInputImages = (inputs, keys = exports.INPUT_IMAGE_KEYS) => {
      const declaredRaw = Number(inputs.imageInputCount);
      const declared = Number.isFinite(declaredRaw) ? clamp(Math.trunc(declaredRaw), 0, 1e3) : 0;
      return Math.max(declared, (0, exports.collectInputUrls)(inputs, keys).length);
    };
    exports.countInputImages = countInputImages;
    var countInputVideos = (inputs) => (0, exports.collectInputUrls)(inputs, exports.INPUT_VIDEO_KEYS).length;
    exports.countInputVideos = countInputVideos;
    var measuredInputVideoSeconds = (inputs) => {
      const value = inputs.inputVideoSeconds;
      return typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : void 0;
    };
    exports.measuredInputVideoSeconds = measuredInputVideoSeconds;
    var billedInputVideoSeconds = (inputs, providerMaxSeconds, hasVideo = (0, exports.countInputVideos)(inputs) > 0) => {
      if (!hasVideo)
        return 0;
      const measured = (0, exports.measuredInputVideoSeconds)(inputs);
      return measured === void 0 ? providerMaxSeconds : measured;
    };
    exports.billedInputVideoSeconds = billedInputVideoSeconds;
    exports.INPUT_IMAGE_MEGAPIXEL_PRICED_MODELS = [
      "flux-2-pro-edit",
      "hunyuan",
      "ideogram-v4",
      "gpt-image-2-edit"
    ];
    exports.UNMEASURED_INPUT_IMAGE_PIXELS = 25e6;
    var billedInputImagePixels = (inputs, count) => {
      const measured = inputs.inputImageMegapixels;
      if (Array.isArray(measured) && measured.length >= count && count > 0) {
        return measured.slice(0, count).map((mp) => Math.round(mp * 1e6));
      }
      return Array.from({ length: count }, () => exports.UNMEASURED_INPUT_IMAGE_PIXELS);
    };
    exports.billedInputImagePixels = billedInputImagePixels;
    var falMegapixelsCeil = (pixels) => Math.max(1, Math.ceil(Math.round(pixels / 1048576 * 1e6) / 1e6));
    exports.falMegapixelsCeil = falMegapixelsCeil;
    exports.FAL_IMAGE_SIZE_PRESETS = {
      square_hd: { width: 1024, height: 1024 },
      square: { width: 512, height: 512 },
      portrait_4_3: { width: 768, height: 1024 },
      portrait_16_9: { width: 576, height: 1024 },
      landscape_4_3: { width: 1024, height: 768 },
      landscape_16_9: { width: 1024, height: 576 },
      auto_1K: { width: 1024, height: 1024 },
      "auto_1.5K": { width: 1536, height: 1536 },
      auto_2K: { width: 2048, height: 2048 },
      auto_3K: { width: 3072, height: 3072 },
      auto_4K: { width: 4096, height: 4096 }
    };
    var imageSizePixels = (value) => {
      if (isBlank(value))
        return void 0;
      if (typeof value === "string") {
        const key = value.trim();
        if (key.toLowerCase() === "auto")
          return "auto";
        const preset = exports.FAL_IMAGE_SIZE_PRESETS[key];
        if (preset)
          return preset.width * preset.height;
        const match = /^(\d{2,5})\s*[x×]\s*(\d{2,5})$/i.exec(key);
        if (match)
          return Number(match[1]) * Number(match[2]);
        return void 0;
      }
      if (typeof value === "object") {
        const { width, height } = value;
        const w = Number(width);
        const h = Number(height);
        if (Number.isFinite(w) && Number.isFinite(h) && w > 0 && h > 0)
          return Math.round(w) * Math.round(h);
      }
      return void 0;
    };
    exports.imageSizePixels = imageSizePixels;
    var IMAGE_TIER_TO_P = {
      "0.5k": "1080p",
      "1k": "1080p",
      "2k": "1440p",
      "4k": "2160p"
    };
    var hasUrlList = (value) => Array.isArray(value) ? value.length > 0 : Boolean(value);
    var boundedVideoDuration = (value, fallback, min, max) => {
      const parsed = Number(value);
      if (!Number.isFinite(parsed))
        return fallback;
      return Math.min(max, Math.max(min, Math.trunc(parsed)));
    };
    var wan27BillableDuration = (inputs, falModelId) => {
      const endpoint = String(falModelId || inputs.falModelId || "");
      let max = 15;
      if (endpoint.includes("reference-to-video") || endpoint.includes("/edit-video")) {
        max = 10;
      } else if (endpoint.includes("image-to-video") || endpoint.includes("text-to-video")) {
        max = 15;
      } else {
        const isReference = inputs.mode === "reference" || inputs.wan_mode === "reference" || inputs.video_usage === "reference" || hasUrlList(inputs.reference_image_urls) || hasUrlList(inputs.reference_video_urls);
        const isEdit = typeof inputs.reference_image_url === "string" || Boolean(inputs.video_url) && inputs.audio_setting !== void 0;
        max = isReference || isEdit ? 10 : 15;
      }
      const parsed = Number(inputs.duration);
      const requested = Number.isFinite(parsed) && parsed > 0 ? Math.trunc(parsed) : 5;
      return Math.min(max, Math.max(0, requested));
    };
    exports.wan27BillableDuration = wan27BillableDuration;
    var seedance2SentDuration = (raw) => {
      if (raw === void 0 || raw === null || raw === "" || raw === "auto")
        return "5";
      const n = Number(raw);
      if (!Number.isFinite(n) || n <= 0)
        return "5";
      return String(raw);
    };
    exports.seedance2SentDuration = seedance2SentDuration;
    var normalizeSeedanceResolution = (raw, supported) => {
      if (raw === void 0 || raw === null || raw === "") {
        return supported[0];
      }
      const r = String(raw).toLowerCase();
      if (supported.includes(r))
        return r;
      const mapped = IMAGE_TIER_TO_P[r];
      if (mapped && supported.includes(mapped))
        return mapped;
      return supported[0];
    };
    exports.normalizeSeedanceResolution = normalizeSeedanceResolution;
    var seedance2VideoCost = (inputs, usdPerThousandTokens) => {
      const resolution = (0, exports.normalizeSeedanceResolution)(inputs.resolution, ["480p", "720p"]);
      const durationRaw = inputs.duration;
      const parsed = Number(durationRaw);
      const duration = Number.isFinite(parsed) && parsed > 0 ? parsed : 5;
      const dims = {
        "480p": { width: 854, height: 480 },
        "720p": { width: 1280, height: 720 }
      };
      const { width, height } = dims[resolution] || dims["720p"];
      const tokensPerOutputSecond = width * height * 24 / 1024;
      const usdPerOutputSecond = tokensPerOutputSecond * usdPerThousandTokens / 1e3;
      const hasVideoInput = Boolean(inputs.video_url || (Array.isArray(inputs.video_urls) ? inputs.video_urls.length > 0 : inputs.video_urls));
      const multiplier = hasVideoInput ? 0.6 : 1;
      return (0, exports.roundCostUpToHundredth)(usdPerOutputSecond * duration * multiplier * 100);
    };
    var cinemaStudio4CreditCost = (inputs) => {
      const resolution = (0, exports.normalizeSeedanceResolution)(inputs.resolution, ["480p", "720p"]);
      const outputDuration = boundedVideoDuration(inputs.duration, 5, 4, 30);
      const hasVideoInput = Boolean(inputs.video_url || hasUrlList(inputs.video_urls));
      const measuredInputDuration = Math.max(0, Number(inputs.input_video_duration) || 0);
      const inputDuration = measuredInputDuration || (hasVideoInput ? outputDuration : 0);
      const dims = resolution === "480p" ? { width: 854, height: 480 } : { width: 1280, height: 720 };
      const tokens = Math.ceil((inputDuration + outputDuration) * dims.width * dims.height * 24 / 1024);
      const usd = tokens * (hasVideoInput ? 0.01284 : 0.0214) / 1e3;
      return (0, exports.roundCostUpToHundredth)(usd * 100);
    };
    var GENJUTSU_USD_PER_SECOND = {
      "480p": 0.159,
      "720p": 0.3405,
      "1080p": 0.816
    };
    var genjutsuCreditCost = (inputs) => {
      const resolution = (0, exports.normalizeSeedanceResolution)(inputs.resolution, ["720p", "480p", "1080p"]);
      const seconds = Math.max(1, Math.ceil(Number(inputs.input_video_duration) || 5));
      const usdPerSecond = GENJUTSU_USD_PER_SECOND[resolution] ?? GENJUTSU_USD_PER_SECOND["720p"];
      return (0, exports.roundCostUpToHundredth)(seconds * usdPerSecond * 100);
    };
    exports.MEDIA_PRICING = {
      "nano-banana": { baseCost: 15, calculateCost: nanoBananaProCredits },
      "nano-banana-2": { baseCost: 8, calculateCost: nanoBanana2Credits },
      "nano-banana-pro": { baseCost: 15, calculateCost: nanoBananaProCredits },
      "nano-banana-pro-t2i": { baseCost: 15, calculateCost: nanoBananaProCredits },
      "nano-banana-2-t2i": { baseCost: 8, calculateCost: nanoBanana2Credits },
      // Nano Banana Lite : sortie 1K fixe, 0,042 $/image (cf. nanoBananaLiteCredits).
      "nano-banana-lite": { baseCost: 5, calculateCost: nanoBananaLiteCredits },
      "nano-banana-lite-t2i": { baseCost: 5, calculateCost: nanoBananaLiteCredits },
      "nano-banana-2-lite": { baseCost: 5, calculateCost: nanoBananaLiteCredits },
      "nano-banana-2-lite-t2i": { baseCost: 5, calculateCost: nanoBananaLiteCredits },
      "seedream": { baseCost: 4, calculateCost: (inputs) => 4 * seedreamOutputs(inputs) },
      "seedream-t2i": { baseCost: 4, calculateCost: (inputs) => 4 * seedreamOutputs(inputs) },
      "seedream-lite-t2i": { baseCost: 4, calculateCost: (inputs) => (0, exports.creditsFromUsd)(0.035) * seedreamOutputs(inputs) },
      // Défaut (1K, ratio auto) : `auto_1K` envoyé → 7 (BV-341, lot `builders`).
      "seedream-pro-t2i": { baseCost: 7, calculateCost: (inputs) => seedreamProCredits(inputs, false) },
      "kling-t2i": { baseCost: 3, calculateCost: klingV3ImageCredits },
      "kling-o3-t2i": { baseCost: 3, calculateCost: klingO3ImageCredits },
      "hunyuan-t2i": { baseCost: 10, calculateCost: hunyuanT2iCredits },
      "qwen-max-t2i": { baseCost: 8, calculateCost: qwenFlat(0.075, 4) },
      "flux-2-pro-edit": { baseCost: 6, calculateCost: flux2ProEditCredits },
      "qwen-image-2-edit": { baseCost: 4, calculateCost: qwenFlat(0.035, 6) },
      "seedream-lite": { baseCost: 4, calculateCost: (inputs) => (0, exports.creditsFromUsd)(0.035) * seedreamOutputs(inputs) },
      "seedream-pro": { baseCost: 7, calculateCost: (inputs) => seedreamProCredits(inputs, true) },
      // Seedream 5.0 Flash (BV-342) : 0,027 $/image quelle que soit la taille.
      "seedream-flash": { baseCost: seedreamFlash_1.SEEDREAM_FLASH_CREDITS, calculateCost: () => (0, seedreamFlash_1.seedreamFlashCreditCost)() },
      "seedream-flash-t2i": { baseCost: seedreamFlash_1.SEEDREAM_FLASH_CREDITS, calculateCost: () => (0, seedreamFlash_1.seedreamFlashCreditCost)() },
      // Plancher (2 calques en auto_1K). Le coût réel est calculé par calque dans
      // layerizePricing.ts — cette entrée évite un « Modèle inconnu » sur les
      // chemins qui interrogent AI_PRICING.
      "seedream-pro-layerize": { baseCost: 8 },
      // BV-341 : 2 calques × 4 cr
      "bria-ad-delayer": { baseCost: 30 },
      "kling": { baseCost: 3, calculateCost: klingV3ImageCredits },
      "kling-o3": { baseCost: 3, calculateCost: klingO3ImageCredits },
      "qwen-max": { baseCost: 8, calculateCost: qwenFlat(0.075, 6) },
      "qwen-image-2": { baseCost: 4, calculateCost: qwenFlat(0.035, 4) },
      "qwen-image-2-pro": { baseCost: 8, calculateCost: qwenFlat(0.075, 4) },
      "qwen-image-2-pro-edit": { baseCost: 8, calculateCost: qwenFlat(0.075, 6) },
      "grok-edit": { baseCost: 3, calculateCost: grokEditCredits },
      "grok": { baseCost: 2, calculateCost: (inputs) => 2 * (0, exports.readNumImages)(inputs, GROK_MAX_OUTPUTS) },
      "grok-2": { baseCost: 6, calculateCost: grok2Credits },
      "grok-2-edit": { baseCost: 7, calculateCost: grok2EditCredits },
      // Grok Imagine Pro (« quality », BV-342) : contrat grokImagineQuality.ts.
      "grok-pro": { baseCost: grokImagineQuality_1.GROK_IMAGINE_QUALITY_BASE_COST, calculateCost: (inputs) => (0, grokImagineQuality_1.grokImagineQualityCreditCost)(inputs, "edit") },
      "grok-pro-t2i": { baseCost: grokImagineQuality_1.GROK_IMAGINE_QUALITY_BASE_COST, calculateCost: (inputs) => (0, grokImagineQuality_1.grokImagineQualityCreditCost)(inputs, "t2i") },
      "qwen-image-3": { baseCost: 4, calculateCost: qwen3Credits(false) },
      "qwen-image-3-edit": { baseCost: 8, calculateCost: qwen3Credits(true) },
      "krea-2": { baseCost: 6, calculateCost: (inputs) => hasStyleReferences(inputs) ? 7 : 6 },
      "krea-2-style": { baseCost: 7 },
      "krea-2-medium": { baseCost: 3, calculateCost: (inputs) => hasStyleReferences(inputs) ? 4 : 3 },
      "krea-2-medium-style": { baseCost: 4 },
      "soul-2": { baseCost: 2, calculateCost: soul2Credits },
      "soul-cinema": { baseCost: 10, calculateCost: soulCinemaCredits },
      // BV-341 : prix par qualité × définition (cf. marketingStudioCredits) ; 2 cr en plancher.
      "higgsfield-marketing-studio-image": { baseCost: 23, calculateCost: marketingStudioCredits },
      "higgsfield-genjutsu-motion-transfer": { baseCost: 2043, calculateCost: genjutsuListCredits },
      "higgsfield-genjutsu-object-swap": { baseCost: 2043, calculateCost: genjutsuListCredits },
      "higgsfield-cinema-studio-4": { baseCost: 232, calculateCost: cinemaStudioListCredits },
      "krea-2-turbo": { baseCost: 1, calculateCost: kreaTurboCredits(8e-3) },
      "krea-2-turbo-style": { baseCost: 1, calculateCost: kreaTurboCredits(0.01) },
      "hunyuan": { baseCost: 9, calculateCost: hunyuanEditCredits },
      "hidream-o1-image-t2i": { baseCost: 5, calculateCost: hidreamCredits(false) },
      "hidream-o1-image-edit": { baseCost: 5, calculateCost: hidreamCredits(true) },
      "gpt-image-1-5": { baseCost: 14, calculateCost: gpt15Credits },
      "gpt-image-1-5-edit": { baseCost: 16, calculateCost: gpt15EditCredits },
      "gpt-image-2": { baseCost: 6, calculateCost: gpt2Credits(false) },
      "gpt-image-2-edit": { baseCost: 6, calculateCost: gpt2Credits(true) },
      /* GPT Image 2.5 — grille (définition × qualité) partagée par les quatre
       * endpoints, dans packages/workflow-contracts/src/gptImage25.ts. Le palier
       * facturé est celui que les adapters ENVOIENT : même normaliseur des deux
       * côtés, donc pas de dérive possible. */
      "gpt-image-2-5-flare": { baseCost: gptImage25_1.GPT_IMAGE_25_BASE_COST, calculateCost: gpt25Credits(false) },
      "gpt-image-2-5-flare-edit": { baseCost: gptImage25_1.GPT_IMAGE_25_BASE_COST, calculateCost: gpt25Credits(true) },
      "gpt-image-2-5-sunburst": { baseCost: gptImage25_1.GPT_IMAGE_25_BASE_COST, calculateCost: gpt25Credits(false) },
      "gpt-image-2-5-sunburst-edit": { baseCost: gptImage25_1.GPT_IMAGE_25_BASE_COST, calculateCost: gpt25Credits(true) },
      "flux-2-pro": { baseCost: 6, calculateCost: flux2ProCredits },
      // FLUX 3 Image (BV-342) : contrat flux3Image.ts.
      "flux-3-image": { baseCost: flux3Image_1.FLUX3_IMAGE_BASE_COST, calculateCost: (inputs) => (0, flux3Image_1.flux3ImageCreditCost)(inputs, "edit") },
      "flux-3-image-t2i": { baseCost: flux3Image_1.FLUX3_IMAGE_BASE_COST, calculateCost: (inputs) => (0, flux3Image_1.flux3ImageCreditCost)(inputs, "t2i") },
      "recraft-v4-vector": { baseCost: 8 },
      "recraft-v4.1-pro": { baseCost: 25 },
      "recraft-v4.1-pro-vector": { baseCost: 30 },
      // Recraft V4.1 standard / vector / Flash / Utility / Utility Pro (BV-342) :
      // prix plats par image, table partagée recraftV41.ts.
      "recraft-v4.1": { baseCost: recraftV41_1.RECRAFT_V41_VARIANTS["recraft-v4.1"].credits },
      "recraft-v4.1-vector": { baseCost: recraftV41_1.RECRAFT_V41_VARIANTS["recraft-v4.1-vector"].credits },
      "recraft-v4.1-flash": { baseCost: recraftV41_1.RECRAFT_V41_VARIANTS["recraft-v4.1-flash"].credits },
      "recraft-v4.1-utility": { baseCost: recraftV41_1.RECRAFT_V41_VARIANTS["recraft-v4.1-utility"].credits },
      "recraft-v4.1-utility-pro": { baseCost: recraftV41_1.RECRAFT_V41_VARIANTS["recraft-v4.1-utility-pro"].credits },
      "ideogram-v4": { baseCost: 6, calculateCost: ideogramCredits(true) },
      "ideogram-v4-t2i": { baseCost: 6, calculateCost: ideogramCredits(false) },
      // Ideogram V4.5 (par image selon `quality`) et V4 Fast / Instant (au MP) —
      // contrats ideogram45.ts / ideogramV4Fast.ts (BV-342).
      "ideogram-v4-5": { baseCost: ideogram45_1.IDEOGRAM_45_BASE_COST, calculateCost: (inputs) => (0, ideogram45_1.ideogram45CreditCost)(inputs, "edit") },
      "ideogram-v4-5-t2i": { baseCost: ideogram45_1.IDEOGRAM_45_BASE_COST, calculateCost: (inputs) => (0, ideogram45_1.ideogram45CreditCost)(inputs, "t2i") },
      "ideogram-v4-fast": { baseCost: ideogramV4Fast_1.IDEOGRAM_V4_FAST_BASE_COST, calculateCost: (inputs) => (0, ideogramV4Fast_1.ideogramV4FastCreditCost)(inputs) },
      "ideogram-v4-instant": { baseCost: ideogramV4Fast_1.IDEOGRAM_V4_INSTANT_BASE_COST, calculateCost: (inputs) => (0, ideogramV4Fast_1.ideogramV4InstantCreditCost)(inputs) },
      // Reve 2.1 : $0.25/image, tarif PLAT sur les 3 endpoints FAL.
      "reve-2-1": { baseCost: 25 },
      "reve-2-1-t2i": { baseCost: 25 },
      // Meta Muse Image (BV-342) : 0,01 $/image, t2i comme édition.
      "muse-image": { baseCost: museImage_1.MUSE_IMAGE_CREDITS, calculateCost: () => (0, museImage_1.museImageCreditCost)() },
      "muse-image-t2i": { baseCost: museImage_1.MUSE_IMAGE_CREDITS, calculateCost: () => (0, museImage_1.museImageCreditCost)() },
      "luma-uni-1-t2i": { baseCost: 5, calculateCost: lumaCredits(0.042, 5) },
      "luma-uni-1": { baseCost: 5, calculateCost: lumaCredits(0.042, 5) },
      "luma-uni-1-max-t2i": { baseCost: 11, calculateCost: lumaCredits(0.102, 11) },
      "luma-uni-1-max": { baseCost: 11, calculateCost: lumaCredits(0.102, 11) },
      "ltx-video": { baseCost: 48, calculateCost: ltx23Credits(LTX_PRO_USD, LTX_PRO_LEGACY_CPS) },
      "ltx-video-fast": { baseCost: 36, calculateCost: ltx23Credits(LTX_FAST_USD, LTX_FAST_LEGACY_CPS) },
      // LTX 2.3 Reframe : durée de la SOURCE mesurée, sinon 60 s (cf. ltxReframeCredits).
      "ltx-video-reframe": { baseCost: 1200, calculateCost: ltxReframeCredits },
      // LTX 2.5 — même source que le client ET que le builder de payload : le
      // palier facturé est toujours celui réellement envoyé à FAL.
      "ltx-25-fast": {
        baseCost: 78,
        calculateCost: (inputs) => (
          // Un audio branché bascule le nœud en audio-to-video, facturé à la seconde
          // de l'audio d'ENTRÉE — durée qu'aucun paramètre ne porte. Le montant rendu
          // ici est donc une RÉSERVATION au plafond de 20 s ; `executeWorkflowPortable`
          // régularise sur la durée réellement rendue par FAL. Ne jamais renvoyer le
          // plancher : ce serait un audio de 20 s facturé comme un de 2 s.
          (0, ltx25_1.resolveLtx25AudioUrl)(inputs) ? (0, ltx25_1.ltx25AudioReservation)("fast") : (0, ltx25_1.ltx25CreditCost)({ mode: "fast", resolution: inputs.resolution, duration: inputs.duration })
        )
      },
      "ltx-25-pro": {
        baseCost: 102,
        calculateCost: (inputs) => (
          // Un audio branché bascule le nœud en audio-to-video, facturé à la seconde
          // de l'audio d'ENTRÉE — durée qu'aucun paramètre ne porte. Le montant rendu
          // ici est donc une RÉSERVATION au plafond de 20 s ; `executeWorkflowPortable`
          // régularise sur la durée réellement rendue par FAL. Ne jamais renvoyer le
          // plancher : ce serait un audio de 20 s facturé comme un de 2 s.
          (0, ltx25_1.resolveLtx25AudioUrl)(inputs) ? (0, ltx25_1.ltx25AudioReservation)("pro") : (0, ltx25_1.ltx25CreditCost)({ mode: "pro", resolution: inputs.resolution, duration: inputs.duration })
        )
      },
      "wan-video-flash": { baseCost: 38, calculateCost: wanFlashCredits },
      // Grok Imagine Video — v1, v1.5 et Lite : spec BV-342 (contrat grokVideo.ts),
      // ancien tarif en plancher sur le v1 image-to-video. Extend / Edit retirés de
      // BV-342 : prix FAL invérifiable.
      "grok-video": { baseCost: (0, grokVideo_1.grokVideoBaseCost)("grok-video"), calculateCost: grokVideoCredits },
      "grok-video-1-5": { baseCost: (0, grokVideo_1.grokVideoBaseCost)("grok-video-1-5"), calculateCost: grokVideoSpecCredits("grok-video-1-5") },
      "grok-video-1-5-lite": { baseCost: (0, grokVideo_1.grokVideoBaseCost)("grok-video-1-5-lite"), calculateCost: grokVideoSpecCredits("grok-video-1-5-lite") },
      // BV-345 (main) × BV-341 : max(prix de main, plancher sur la source MESURÉE),
      // cf. `grokVideoSourceMeasuredCredits`. Extend illisible = main (15 s) ; edit
      // illisible = 60 s d'entrée (123 en 720p, 105 en 480p).
      "grok-video-extend": { baseCost: (0, grokVideo_1.grokVideoBaseCost)("grok-video-extend"), calculateCost: grokVideoSourceMeasuredCredits("grok-video-extend") },
      "grok-video-edit": { baseCost: (0, grokVideo_1.grokVideoBaseCost)("grok-video-edit"), calculateCost: grokVideoSourceMeasuredCredits("grok-video-edit") },
      "bytedance-seedance-1.5-pro": { baseCost: 26, calculateCost: seedance15Credits },
      "bytedance-seedance-2-ref-to-video": {
        baseCost: 152,
        calculateCost: seedance2Credits(SEEDANCE_2_USD_PER_SECOND.reference, seedance2RefLegacy)
      },
      "bytedance-seedance-2-fast": {
        baseCost: 121,
        calculateCost: seedance2Credits(SEEDANCE_2_USD_PER_SECOND.fast, (inputs) => seedance2VideoCost(inputs, 0.0112))
      },
      "bytedance-seedance-2-mini": {
        baseCost: 78,
        calculateCost: seedance2Credits(SEEDANCE_2_USD_PER_SECOND.mini, (inputs) => seedance2VideoCost(inputs, 7e-3))
      },
      "kling-v3": { baseCost: 63, calculateCost: klingV3Credits },
      // Kling V3 Turbo (BV-342) — palier = endpoint (slug sur aiProxy, `resolution`
      // sur le nœud, le plus cher gagne) : contrat klingV3Turbo.ts.
      "kling-v3-turbo-video": { baseCost: 56, calculateCost: (inputs) => (0, klingV3Turbo_1.klingV3TurboCreditCostFromInputs)(inputs) },
      "wan-v2-7": { baseCost: 75, calculateCost: wan27Credits },
      // MiniMax H3 — 5/6/13/16 cr/s (480P/768P/2K/4K). R2V : +8 cr / image au-delà de 5.
      // MiniMax H3 Max — 5/8/16 cr/s (480P/768P/1080P, tarif plein). R2V : 8 cr/s (16 en 1080P) + 2 cr / 1k jetons au-delà de 4096.
      "bytedance-seedance-2-5": { baseCost: 237, calculateCost: seedance25Credits },
      "wan-3-0": { baseCost: 100, calculateCost: wan30Credits("standard") },
      "wan-3-0-prime": { baseCost: 140, calculateCost: wan30Credits("prime") },
      "minimax-h3": {
        baseCost: 65,
        calculateCost: (inputs) => (0, minimaxH3_1.h3CreditCost)({ resolution: inputs.resolution, duration: inputs.duration })
      },
      "minimax-h3-image-to-video": {
        baseCost: 65,
        calculateCost: (inputs) => (0, minimaxH3_1.h3CreditCost)({ resolution: inputs.resolution, duration: inputs.duration })
      },
      "minimax-h3-ref-to-video": {
        baseCost: 65,
        calculateCost: (inputs) => (0, minimaxH3_1.h3CreditCost)({
          resolution: inputs.resolution,
          duration: inputs.duration,
          referenceImageCount: (0, minimaxH3_1.countH3ReferenceImages)(inputs)
        })
      },
      // H3 Max : en vue payload, « 1080P » (accepté par FAL) est facturé 16 cr/s.
      "minimax-h3-max": {
        baseCost: 40,
        calculateCost: (inputs) => (0, minimaxH3Max_1.h3MaxCreditCost)({ resolution: inputs.resolution, duration: inputs.duration, sentResolution: sentProviderResolution(inputs) })
      },
      "minimax-h3-max-image-to-video": {
        baseCost: 40,
        calculateCost: (inputs) => (0, minimaxH3Max_1.h3MaxCreditCost)({ resolution: inputs.resolution, duration: inputs.duration, sentResolution: sentProviderResolution(inputs) })
      },
      "minimax-h3-max-ref-to-video": {
        baseCost: 40,
        calculateCost: (inputs) => {
          const refs = (0, minimaxH3Max_1.countH3MaxReferenceMedia)(inputs);
          return (0, minimaxH3Max_1.h3MaxCreditCost)({
            kind: "r2v",
            resolution: inputs.resolution,
            duration: inputs.duration,
            referenceImageCount: refs.images,
            referenceVideoCount: refs.videos,
            referenceAudioCount: refs.audios,
            referenceVideoSeconds: (0, exports.measuredInputVideoSeconds)(inputs),
            sentResolution: sentProviderResolution(inputs)
          });
        }
      },
      // Gemini Omni Flash 1.1 : 3/10/15/30 cr/s selon 360p/720p/1080p/4k.
      // Edit : plafond 10 s × résolution (pas de duration FAL).
      "gemini-omni-flash": {
        baseCost: 80,
        calculateCost: (inputs) => (0, geminiOmniFlash_1.geminiOmniFlashCreditCost)({
          resolution: inputs.resolution,
          duration: inputs.duration,
          dynamicInputs: inputs
        })
      },
      // Gemini Omni Flash V1 (classique) : forfait 14 cr/s (BV-341). Ces
      // endpoints n'exposent aucune résolution et FAL les facture aux tokens
      // (~$0,13/s en 720p + jetons d'entrée).
      "gemini-omni-flash-v1": {
        baseCost: 112,
        // Relecture BV-341 : les jetons des images de référence (≈ 0,00242 $
        // l'image, relevé « 10 s + 10 images = 1,3242 $ ») ne tiennent dans les
        // 14 cr/s que jusqu'à 10 images (plafond du builder). aiProxy n'en borne
        // pas le nombre : 3 s + 16 images = 0,4287 $ → 43 cr, facturés 42.
        calculateCost: (inputs) => Math.max((0, geminiOmniFlashV1_1.geminiOmniFlashV1CreditCost)({ duration: inputs.duration, dynamicInputs: inputs }), (0, exports.creditsFromUsd)(0.13 * (0, geminiOmniFlashV1_1.normalizeGeminiOmniFlashV1Duration)(inputs.duration) + 242e-5 * (0, exports.countInputImages)(inputs)))
      },
      // FLUX 3 : 17/29 cr/s (720p/1080p), 41/53 en prolongation, 41 en édition
      // au plafond de 15 s, 6 ou 12 en brouillon. ⚠️ Le tarif de l'API fal est
      // faux sur cette famille : ces montants viennent du texte des pages.
      "flux-3": {
        baseCost: 85,
        calculateCost: (inputs) => (0, flux3_1.flux3CreditCost)({
          // L'endpoint prime : sur aiProxy, `inputs` EST le payload FAL, qui ne
          // porte ni `mode` ni `draft`. calculateGenerationCost y injecte falModelId.
          falModelId: inputs.falModelId,
          resolution: inputs.resolution,
          duration: inputs.duration,
          dynamicInputs: inputs
        })
      },
      // Rendu pleine qualité d'un brouillon : 29 cr/s au plafond de 20 s.
      "flux-3-enhance": {
        baseCost: 580,
        calculateCost: () => (0, flux3_1.flux3EnhanceCreditCost)()
      },
      "kling-o3-4k": { baseCost: 210, calculateCost: klingO34kCredits },
      "kling-o3-pro-v2v-edit": {
        baseCost: 253,
        calculateCost: (inputs) => (0, klingO3VideoToVideo_1.klingO3VideoToVideoCreditCost)({
          variant: "pro-edit",
          dynamicInputs: inputs,
          sourceSeconds: klingO3EditSourceSeconds(inputs)
        })
      },
      "kling-o3-4k-v2v-reference": {
        baseCost: 210,
        calculateCost: (inputs) => (0, klingO3VideoToVideo_1.klingO3VideoToVideoCreditCost)({
          variant: "4k-reference",
          duration: inputs.duration,
          dynamicInputs: inputs,
          sourceSeconds: klingO3EditSourceSeconds(inputs),
          durationLeftToModel: (0, exports.isPayloadView)(inputs) && (isBlank(inputs.duration) || inputs.duration === "auto")
        })
      },
      // Multi Angle facture au palier PLEIN, 1080P compris — un palier que le
      // H3 Max classique n'a pas : 5 s en 768P = 40 cr, 5 s en 1080P = 80 cr.
      "minimax-h3-max-multi-angle-image-to-video": {
        baseCost: 40,
        calculateCost: (inputs) => (0, minimaxH3MultiAngle_1.h3MultiAngleCreditCost)({ resolution: inputs.resolution, duration: inputs.duration })
      },
      "minimax-h3-max-turbo": {
        baseCost: 20,
        calculateCost: (inputs) => (0, minimaxH3MaxTurbo_1.h3MaxTurboCreditCost)({ resolution: inputs.resolution, duration: inputs.duration, sentResolution: sentProviderResolution(inputs) })
      },
      "minimax-h3-max-turbo-image-to-video": {
        baseCost: 20,
        calculateCost: (inputs) => (0, minimaxH3MaxTurbo_1.h3MaxTurboCreditCost)({ resolution: inputs.resolution, duration: inputs.duration, sentResolution: sentProviderResolution(inputs) })
      },
      // H3 Max Extend (BV-342) : la durée facturée est celle de l'EXTENSION,
      // 5 / 8 / 16 / 32 cr/s (480P → 2K) ; Turbo 2,5 / 4 / 8 / 16.
      // Variante max : la vidéo source compte en jetons de référence (BV-341,
      // ≈ 6 855 jetons/s, mesurée sinon 60 s). baseCost = devis sans mesure.
      "minimax-h3-max-extend-video": {
        baseCost: (0, minimaxH3MaxExtend_1.h3MaxExtendCreditCost)({ variant: "max" }),
        calculateCost: (inputs) => (0, minimaxH3MaxExtend_1.h3MaxExtendCreditCost)({
          variant: "max",
          resolution: inputs.resolution,
          duration: inputs.duration,
          sourceSeconds: (0, exports.measuredInputVideoSeconds)(inputs)
        })
      },
      "minimax-h3-max-turbo-extend-video": {
        baseCost: 20,
        calculateCost: (inputs) => (0, minimaxH3MaxExtend_1.h3MaxExtendCreditCost)({ variant: "turbo", resolution: inputs.resolution, duration: inputs.duration })
      },
      // H3 Max Insert : 5 / 6 cr/s (480p / 768p) × durée de la scène générée, + 2 cr
      // par 1k jetons au-delà de 4096 (images 4 000 ; vidéos — source comprise —
      // ≈ 6 855 jetons/s, mesurées sinon 60 s + 15 s par référence, BV-341).
      "minimax-h3-max-insert-video": {
        baseCost: (0, minimaxH3MaxInsert_1.h3MaxInsertCreditCost)({}),
        calculateCost: (inputs) => {
          const refs = (0, minimaxH3MaxInsert_1.countH3MaxInsertReferences)(inputs);
          return (0, minimaxH3MaxInsert_1.h3MaxInsertCreditCost)({
            resolution: inputs.resolution,
            duration: inputs.duration,
            referenceImageCount: refs.images,
            referenceVideoCount: refs.videos,
            inputVideoSeconds: (0, exports.measuredInputVideoSeconds)(inputs)
          });
        }
      },
      // H3 Max Styles : 8 cr/s, même prix pour les cinq styles (768p fixe).
      "minimax-h3-max-styles-video": {
        baseCost: 40,
        calculateCost: (inputs) => (0, minimaxH3MaxStyles_1.h3MaxStylesCreditCost)({ duration: inputs.duration })
      }
    };
  }
});

// ../packages/workflow-contracts/dist/modelFamilies.js
var require_modelFamilies = __commonJS({
  "../packages/workflow-contracts/dist/modelFamilies.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.resolveModelVariant = exports.getModelFamily = exports.normalizeModelId = exports.LEGACY_MODEL_ALIASES = exports.hasImageInput = exports.MODEL_FAMILIES = void 0;
    exports.MODEL_FAMILIES = {
      "nano-banana-pro": {
        id: "nano-banana-pro",
        displayName: "Nano Banana Pro",
        iconUrl: "/models/ggl100x100.png",
        variants: { t2i: "nano-banana-pro-t2i", i2i: "nano-banana" },
        defaultVariant: "t2i"
      },
      "nano-banana-2": {
        id: "nano-banana-2",
        displayName: "Nano Banana 2",
        iconUrl: "/models/ggl100x100.png",
        variants: { t2i: "nano-banana-2-t2i", i2i: "nano-banana-2" },
        defaultVariant: "t2i"
      },
      "nano-banana-lite": {
        id: "nano-banana-lite",
        displayName: "Nano Banana Lite",
        iconUrl: "/models/ggl100x100.png",
        variants: { t2i: "nano-banana-lite-t2i", i2i: "nano-banana-lite" },
        defaultVariant: "t2i"
      },
      "nano-banana-2-lite": {
        id: "nano-banana-2-lite",
        displayName: "Nano Banana 2 Lite",
        iconUrl: "/models/ggl100x100.png",
        variants: { t2i: "nano-banana-2-lite-t2i", i2i: "nano-banana-2-lite" },
        defaultVariant: "t2i"
      },
      "gpt-image-1-5": {
        id: "gpt-image-1-5",
        displayName: "GPT Image 1.5",
        iconUrl: "/models/oa100x100.png",
        variants: { t2i: "gpt-image-1-5", i2i: "gpt-image-1-5-edit" },
        defaultVariant: "t2i"
      },
      "gpt-image-2": {
        id: "gpt-image-2",
        displayName: "GPT Image 2",
        iconUrl: "/models/oa100x100.png",
        variants: { t2i: "gpt-image-2", i2i: "gpt-image-2-edit" },
        defaultVariant: "t2i"
      },
      "gpt-image-2-5-flare": {
        id: "gpt-image-2-5-flare",
        displayName: "GPT Image 2.5 Flare",
        iconUrl: "/models/oa100x100.png",
        variants: { t2i: "gpt-image-2-5-flare", i2i: "gpt-image-2-5-flare-edit" },
        defaultVariant: "t2i"
      },
      "gpt-image-2-5-sunburst": {
        id: "gpt-image-2-5-sunburst",
        displayName: "GPT Image 2.5 Sunburst",
        iconUrl: "/models/oa100x100.png",
        variants: { t2i: "gpt-image-2-5-sunburst", i2i: "gpt-image-2-5-sunburst-edit" },
        defaultVariant: "t2i"
      },
      "qwen-image-2-pro": {
        id: "qwen-image-2-pro",
        displayName: "Qwen Image 2 Pro",
        iconUrl: "/models/wan100x100.png",
        variants: { t2i: "qwen-image-2-pro", i2i: "qwen-image-2-pro-edit" },
        defaultVariant: "t2i"
      },
      grok: {
        id: "grok",
        displayName: "Grok Imagine",
        iconUrl: "/models/grok100x100.png",
        variants: { t2i: "grok", i2i: "grok-edit" },
        defaultVariant: "t2i"
      },
      "grok-2": {
        id: "grok-2",
        displayName: "Grok Imagine 2.0",
        iconUrl: "/models/grok100x100.png",
        variants: { t2i: "grok-2", i2i: "grok-2-edit" },
        defaultVariant: "t2i"
      },
      "grok-pro": {
        id: "grok-pro",
        displayName: "Grok Imagine Pro",
        iconUrl: "/models/grok100x100.png",
        variants: { t2i: "grok-pro-t2i", i2i: "grok-pro" },
        defaultVariant: "t2i"
      },
      "qwen-image-3": {
        id: "qwen-image-3",
        displayName: "Qwen Image 3",
        iconUrl: "/models/wan100x100.png",
        variants: { t2i: "qwen-image-3", i2i: "qwen-image-3-edit" },
        defaultVariant: "t2i"
      },
      "krea-2": {
        id: "krea-2",
        displayName: "Krea 2",
        iconUrl: "/models/krea100x100.svg",
        variants: { t2i: "krea-2", i2i: "krea-2-style" },
        defaultVariant: "t2i"
      },
      "krea-2-medium": {
        id: "krea-2-medium",
        displayName: "Krea 2 Medium",
        iconUrl: "/models/krea100x100.svg",
        variants: { t2i: "krea-2-medium", i2i: "krea-2-medium-style" },
        defaultVariant: "t2i"
      },
      "krea-2-turbo": {
        id: "krea-2-turbo",
        displayName: "Krea 2 Turbo",
        iconUrl: "/models/krea100x100.svg",
        variants: { t2i: "krea-2-turbo", i2i: "krea-2-turbo-style" },
        defaultVariant: "t2i"
      },
      "hidream-o1-image": {
        id: "hidream-o1-image",
        displayName: "HiDream O1 Image",
        iconUrl: "/models/hid100x100.png",
        variants: { t2i: "hidream-o1-image-t2i", i2i: "hidream-o1-image-edit" },
        defaultVariant: "t2i"
      },
      "ideogram-v4": {
        id: "ideogram-v4",
        displayName: "Ideogram V4",
        iconUrl: "/models/ig100x100.png",
        variants: { t2i: "ideogram-v4-t2i", i2i: "ideogram-v4" },
        defaultVariant: "t2i"
      },
      "ideogram-v4-5": {
        id: "ideogram-v4-5",
        displayName: "Ideogram V4.5",
        iconUrl: "/models/ig100x100.png",
        variants: { t2i: "ideogram-v4-5-t2i", i2i: "ideogram-v4-5" },
        defaultVariant: "t2i"
      },
      "reve-2-1": {
        id: "reve-2-1",
        displayName: "Reve 2.1",
        iconUrl: "/models/reve100x100.png",
        variants: { t2i: "reve-2-1-t2i", i2i: "reve-2-1" },
        defaultVariant: "t2i"
      },
      // Meta n'a pas de logo dans public/models/ : `iconUrl` vide → les sélecteurs
      // affichent leur pastille générique (couleur du thème / icône Sparkles). La
      // marque MCP (« Meta ») est posée à part, dans mcp/src/modelLabels.ts.
      "muse-image": {
        id: "muse-image",
        displayName: "Meta Muse Image",
        iconUrl: "",
        variants: { t2i: "muse-image-t2i", i2i: "muse-image" },
        defaultVariant: "t2i"
      },
      "luma-uni-1": {
        id: "luma-uni-1",
        displayName: "Luma Uni-1",
        iconUrl: "/models/lm100x100.png",
        variants: { t2i: "luma-uni-1-t2i", i2i: "luma-uni-1" },
        defaultVariant: "t2i"
      },
      "luma-uni-1-max": {
        id: "luma-uni-1-max",
        displayName: "Luma Uni-1 Max",
        iconUrl: "/models/lm100x100.png",
        variants: { t2i: "luma-uni-1-max-t2i", i2i: "luma-uni-1-max" },
        defaultVariant: "t2i"
      },
      "flux-2-pro": {
        id: "flux-2-pro",
        displayName: "FLUX.2 Pro",
        iconUrl: "/models/flux100x100.png",
        variants: { t2i: "flux-2-pro", i2i: "flux-2-pro-edit" },
        defaultVariant: "t2i"
      },
      "flux-3-image": {
        id: "flux-3-image",
        displayName: "FLUX 3 Image",
        iconUrl: "/models/flux100x100.png",
        variants: { t2i: "flux-3-image-t2i", i2i: "flux-3-image" },
        defaultVariant: "t2i"
      },
      "qwen-image-2": {
        id: "qwen-image-2",
        displayName: "Qwen Image 2",
        iconUrl: "/models/wan100x100.png",
        variants: { t2i: "qwen-image-2", i2i: "qwen-image-2-edit" },
        defaultVariant: "t2i"
      },
      seedream: {
        id: "seedream",
        displayName: "Seedream",
        iconUrl: "/models/bytedance100x100.png",
        variants: { t2i: "seedream-t2i", i2i: "seedream" },
        defaultVariant: "t2i"
      },
      "seedream-lite": {
        id: "seedream-lite",
        displayName: "Seedream Lite",
        iconUrl: "/models/bytedance100x100.png",
        variants: { t2i: "seedream-lite-t2i", i2i: "seedream-lite" },
        defaultVariant: "t2i"
      },
      "seedream-pro": {
        id: "seedream-pro",
        displayName: "Seedream 5 Pro",
        iconUrl: "/models/bytedance100x100.png",
        variants: { t2i: "seedream-pro-t2i", i2i: "seedream-pro" },
        defaultVariant: "t2i"
      },
      "seedream-flash": {
        id: "seedream-flash",
        displayName: "Seedream 5 Flash",
        iconUrl: "/models/bytedance100x100.png",
        variants: { t2i: "seedream-flash-t2i", i2i: "seedream-flash" },
        defaultVariant: "t2i"
      },
      kling: {
        id: "kling",
        displayName: "Kling Image",
        iconUrl: "/models/kl100x100.png",
        variants: { t2i: "kling-t2i", i2i: "kling" },
        defaultVariant: "t2i"
      },
      "kling-o3": {
        id: "kling-o3",
        displayName: "Kling Image o3",
        iconUrl: "/models/kl100x100.png",
        variants: { t2i: "kling-o3-t2i", i2i: "kling-o3" },
        defaultVariant: "t2i"
      },
      hunyuan: {
        id: "hunyuan",
        displayName: "Hunyuan Image",
        iconUrl: "/models/tencent100x100.png",
        variants: { t2i: "hunyuan-t2i", i2i: "hunyuan" },
        defaultVariant: "t2i"
      },
      "qwen-max": {
        id: "qwen-max",
        displayName: "Qwen Image Max",
        iconUrl: "/models/wan100x100.png",
        variants: { t2i: "qwen-max-t2i", i2i: "qwen-max" },
        defaultVariant: "t2i"
      }
    };
    var IMAGE_INPUT_KEY_PATTERN = /(image|mask|reference|file|audio)/i;
    var NON_MEDIA_SETTING_KEY_PATTERN = /(_size|_mode|_strength|_weight|_scale|_setting|_type|_format|_count|_id|InputCount|Size|Mode|Strength|Weight|Scale|Count|Id)$/;
    var NON_MEDIA_SETTING_KEY_PATTERN_CI = /(_size|_format|_mode|_type|_strength|_count|_fidelity|_settings?)$|^(num|max)_images$/i;
    var isImageInputKey = (key) => {
      return IMAGE_INPUT_KEY_PATTERN.test(key) && !NON_MEDIA_SETTING_KEY_PATTERN.test(key) && !NON_MEDIA_SETTING_KEY_PATTERN_CI.test(key);
    };
    var isImageUrlString = (value) => {
      return typeof value === "string" && value.length > 0;
    };
    var isNonEmptyImageValue = (value) => {
      if (value === null || value === void 0)
        return false;
      if (typeof value === "string")
        return value.length > 0;
      if (Array.isArray(value)) {
        return value.length > 0 && value.some((entry) => isImageUrlString(entry));
      }
      return false;
    };
    var hasImageInput = (inputs) => {
      for (const [key, value] of Object.entries(inputs)) {
        if (isImageInputKey(key) && isNonEmptyImageValue(value)) {
          return true;
        }
      }
      return false;
    };
    exports.hasImageInput = hasImageInput;
    exports.LEGACY_MODEL_ALIASES = {
      reve: "ideogram-v4",
      "reve-text": "ideogram-v4-t2i",
      "ideogram-v3": "ideogram-v4",
      "ideogram-v3-t2i": "ideogram-v4-t2i",
      // Gemini Omni Flash : les 3 variantes standalone (live ~2h en PR #231) ont été
      // fusionnées dans le modèle unifié `gemini-omni-flash` (auto-route i2v/ref/edit
      // selon les inputs du nœud). Alias pour ne pas casser d'éventuels nœuds sauvegardés.
      "gemini-omni-flash-i2v": "gemini-omni-flash",
      "gemini-omni-flash-ref": "gemini-omni-flash",
      "gemini-omni-flash-edit": "gemini-omni-flash",
      // Veo 3.1 Fast retiré du catalogue (2026-08-18) : les nœuds déjà enregistrés
      // chez les utilisateurs portent encore ce slug. Sans alias, ils échoueraient
      // au prochain run (`getModelDefinition` undefined) après un « Modèle
      // inconnu » au pricing. Redirigé vers LTX 2.5 Fast, le plus proche en usage
      // (image-to-video avec audio natif) — et moins cher : 13 cr/s en 1080p
      // contre 15 pour Veo, donc jamais une mauvaise surprise de facturation.
      "veo-3.1-fast": "ltx-25-fast"
    };
    var normalizeModelId = (modelId) => exports.LEGACY_MODEL_ALIASES[modelId] ?? modelId;
    exports.normalizeModelId = normalizeModelId;
    var getModelFamily = (modelId) => {
      return exports.MODEL_FAMILIES[(0, exports.normalizeModelId)(modelId)] ?? null;
    };
    exports.getModelFamily = getModelFamily;
    var resolveModelVariant2 = (modelId, inputs = {}) => {
      const normalizedId = (0, exports.normalizeModelId)(modelId);
      const family = (0, exports.getModelFamily)(normalizedId);
      if (!family) {
        return { adapterId: normalizedId, variant: null, family: null };
      }
      const wantsI2I = (0, exports.hasImageInput)(inputs);
      const useI2I = wantsI2I && Boolean(family.variants.i2i);
      const useT2I = !useI2I && Boolean(family.variants.t2i);
      if (useI2I && family.variants.i2i) {
        return { adapterId: family.variants.i2i, variant: "i2i", family };
      }
      if (useT2I && family.variants.t2i) {
        return { adapterId: family.variants.t2i, variant: "t2i", family };
      }
      const fallbackId = family.defaultVariant === "t2i" ? family.variants.t2i : family.variants.i2i;
      return {
        adapterId: fallbackId ?? normalizedId,
        variant: family.defaultVariant,
        family
      };
    };
    exports.resolveModelVariant = resolveModelVariant2;
  }
});

// src/core/runner.ts
import { Command, CommanderError as CommanderError2, Help, Option } from "commander";

// src/commands/auth.ts
import { z } from "zod";

// src/core/context.ts
var buildMeta = (logs) => ({
  timestamp: (/* @__PURE__ */ new Date()).toISOString(),
  logs: [...logs]
});
var createSuccessResponse = (command, data, logs) => ({
  ok: true,
  command,
  data,
  meta: buildMeta(logs)
});
var createErrorResponse = (command, error, logs) => ({
  ok: false,
  command,
  error,
  meta: buildMeta(logs)
});

// src/core/commandAction.ts
var createCommandAction = (options) => {
  return async (rawOptions, command) => {
    options.context.commandName = options.commandName;
    const opts = command?.opts ? command.opts() : rawOptions;
    const parsedOptions = options.schema.parse(opts);
    const result = await options.handler(parsedOptions, options.context);
    options.context.response = createSuccessResponse(
      options.commandName,
      result,
      options.context.output.logs
    );
  };
};

// src/core/localAuth.ts
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { homedir } from "node:os";

// src/core/configPaths.ts
var CLI_CONFIG_DIRECTORY_NAME = "visionboard";

// src/core/env.ts
var readCliEnvVar = (env, suffix) => {
  const canonical = env[`BEEMMVISION_${suffix}`];
  if (canonical && canonical.trim()) {
    return canonical;
  }
  const legacy = env[`VISIONBOARD_${suffix}`];
  if (legacy && legacy.trim()) {
    return legacy;
  }
  return void 0;
};

// src/core/localAuth.ts
var resolveConfigHome = (env) => {
  if (env.XDG_CONFIG_HOME && env.XDG_CONFIG_HOME.trim()) {
    return env.XDG_CONFIG_HOME;
  }
  if (env.HOME && env.HOME.trim()) {
    return join(env.HOME, ".config");
  }
  return join(homedir(), ".config");
};
var getVisionboardAuthFilePath = (env = process.env) => {
  const authFile = readCliEnvVar(env, "AUTH_FILE");
  if (authFile) {
    return authFile;
  }
  return join(resolveConfigHome(env), CLI_CONFIG_DIRECTORY_NAME, "auth.json");
};
var loadStoredAuth = (env = process.env) => {
  const authFilePath = getVisionboardAuthFilePath(env);
  if (!existsSync(authFilePath)) {
    return void 0;
  }
  try {
    const raw = readFileSync(authFilePath, "utf8");
    return JSON.parse(raw);
  } catch {
    return void 0;
  }
};
var loadStoredFirebaseIdToken = (env = process.env) => {
  const parsed = loadStoredAuth(env);
  return parsed && typeof parsed.firebaseIdToken === "string" && parsed.firebaseIdToken.trim() ? parsed.firebaseIdToken.trim() : void 0;
};
var storeAuthSession = (input, env = process.env) => {
  const authFilePath = getVisionboardAuthFilePath(env);
  mkdirSync(dirname(authFilePath), { recursive: true, mode: 448 });
  const document = {
    firebaseIdToken: input.firebaseIdToken,
    refreshToken: input.refreshToken,
    apiKey: input.apiKey,
    appCheckToken: input.appCheckToken,
    appCheckTokenExpiresAt: input.appCheckTokenExpiresAt ?? (input.appCheckToken ? readAppCheckTokenExpiry(input.appCheckToken) : void 0),
    updatedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  writeFileSync(authFilePath, `${JSON.stringify(document, null, 2)}
`, {
    encoding: "utf8",
    mode: 384
  });
  return authFilePath;
};
var clearStoredFirebaseIdToken = (env = process.env) => {
  const authFilePath = getVisionboardAuthFilePath(env);
  rmSync(authFilePath, { force: true });
  return authFilePath;
};
var decodeBase64Url = (value) => {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  return Buffer.from(padded, "base64").toString("utf8");
};
var readAppCheckTokenExpiry = (token) => {
  const parts = token.split(".");
  if (parts.length !== 3) {
    return void 0;
  }
  try {
    const payload = JSON.parse(decodeBase64Url(parts[1]));
    if (typeof payload.exp !== "number" || !Number.isFinite(payload.exp)) {
      return void 0;
    }
    return new Date(payload.exp * 1e3).toISOString();
  } catch {
    return void 0;
  }
};
var readStoredAppCheckCredential = (env = process.env, nowMs = Date.now()) => {
  const stored = loadStoredAuth(env);
  const token = typeof stored?.appCheckToken === "string" && stored.appCheckToken.trim() ? stored.appCheckToken.trim() : void 0;
  if (!token) {
    return { present: false, expired: false };
  }
  const storedExpiry = typeof stored?.appCheckTokenExpiresAt === "string" && stored.appCheckTokenExpiresAt.trim() ? stored.appCheckTokenExpiresAt.trim() : void 0;
  const expiresAtRaw = storedExpiry ?? readAppCheckTokenExpiry(token);
  const expiryMs = expiresAtRaw ? Date.parse(expiresAtRaw) : Number.NaN;
  const hasExpiry = Number.isFinite(expiryMs);
  return {
    present: true,
    token,
    expiresAt: hasExpiry ? new Date(expiryMs).toISOString() : void 0,
    expiresInSeconds: hasExpiry ? Math.floor((expiryMs - nowMs) / 1e3) : void 0,
    expired: hasExpiry ? expiryMs <= nowMs : false
  };
};
var EXPECTED_ISSUER_PREFIX = "https://securetoken.google.com/";
var getExpectedAudience = () => {
  return readCliEnvVar(process.env, "EXPECTED_TOKEN_AUDIENCE");
};
var decodeFirebaseIdTokenClaims = (token) => {
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("Invalid Firebase ID token format. Expected 3 parts separated by dots.");
  }
  let claims;
  try {
    claims = JSON.parse(decodeBase64Url(parts[1]));
  } catch {
    throw new Error("Invalid Firebase ID token: failed to decode payload.");
  }
  const iss = claims.iss;
  if (typeof iss !== "string" || !iss.startsWith(EXPECTED_ISSUER_PREFIX)) {
    throw new Error(
      `Invalid Firebase ID token: issuer (iss) does not match expected prefix. Got: "${iss}"`
    );
  }
  const projectIdFromIss = iss.slice(EXPECTED_ISSUER_PREFIX.length);
  const aud = claims.aud;
  if (typeof aud !== "string" || !aud.trim()) {
    throw new Error("Invalid Firebase ID token: audience (aud) is missing.");
  }
  const expectedAudience = getExpectedAudience();
  if (expectedAudience) {
    if (aud !== expectedAudience && aud !== projectIdFromIss) {
      throw new Error(
        `Invalid Firebase ID token: audience (aud) "${aud}" does not match expected "${expectedAudience}" or project "${projectIdFromIss}".`
      );
    }
  } else {
    if (aud !== projectIdFromIss) {
      throw new Error(
        `Invalid Firebase ID token: audience (aud) "${aud}" does not match project ID from issuer "${projectIdFromIss}".`
      );
    }
  }
  const exp = claims.exp;
  if (typeof exp !== "number") {
    throw new Error("Invalid Firebase ID token: expiration (exp) is missing.");
  }
  const now = Math.floor(Date.now() / 1e3);
  if (exp < now) {
    throw new Error(
      `Firebase ID token has expired. Expired at ${new Date(exp * 1e3).toISOString()}, current time is ${new Date(now * 1e3).toISOString()}.`
    );
  }
  const sub = claims.sub;
  const userId = claims.user_id;
  if (typeof sub !== "string" && typeof userId !== "string") {
    throw new Error("Invalid Firebase ID token: subject (sub/user_id) is missing.");
  }
  return claims;
};
var getFirebaseTokenAudience = (token) => {
  try {
    const claims = decodeFirebaseIdTokenClaims(token);
    return typeof claims.aud === "string" && claims.aud.trim() ? claims.aud.trim() : void 0;
  } catch {
    return void 0;
  }
};
var refreshFirebaseIdToken = async (env = process.env) => {
  const authData = loadStoredAuth(env);
  if (!authData || !authData.refreshToken || !authData.apiKey) {
    return void 0;
  }
  try {
    const response = await fetch(`https://securetoken.googleapis.com/v1/token?key=${authData.apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: authData.refreshToken
      })
    });
    if (!response.ok) {
      return void 0;
    }
    const data = await response.json();
    if (data.id_token) {
      storeAuthSession(
        {
          firebaseIdToken: data.id_token,
          refreshToken: data.refresh_token || authData.refreshToken,
          apiKey: authData.apiKey,
          appCheckToken: authData.appCheckToken,
          appCheckTokenExpiresAt: authData.appCheckTokenExpiresAt
        },
        env
      );
      return data.id_token;
    }
  } catch {
    return void 0;
  }
  return void 0;
};
var getValidFirebaseIdToken = async (env = process.env) => {
  const token = loadStoredFirebaseIdToken(env);
  if (!token) return void 0;
  try {
    const claims = decodeFirebaseIdTokenClaims(token);
    const exp = typeof claims.exp === "number" ? claims.exp : 0;
    if (Date.now() / 1e3 > exp - 300) {
      return await refreshFirebaseIdToken(env) || token;
    }
  } catch {
    return await refreshFirebaseIdToken(env);
  }
  return token;
};

// src/core/errors.ts
import { CommanderError } from "commander";
import { ZodError } from "zod";

// src/core/exitCodes.ts
var EXIT_CODES = {
  SUCCESS: 0,
  VALIDATION: 1,
  AUTH: 2,
  API: 3
};

// src/core/errors.ts
var CliError = class extends Error {
  type;
  exitCode;
  /**
   * True when the SAME call could plausibly succeed if retried: the backend
   * was unreachable, the request timed out, the server answered 5xx. It says
   * nothing about the envelope — the type and the exit code are unchanged, a
   * one-shot command still fails exactly as before.
   *
   * It exists for the one command that retries by design, `workflow watch`,
   * which must survive a network hiccup but must NOT survive a verdict such as
   * an invalid session. Without this flag the two are indistinguishable,
   * because an unreachable backend and a rejected token are both reported as
   * `auth_error` by the callable transport.
   */
  transient;
  cause;
  constructor(options) {
    super(options.message);
    this.name = "CliError";
    this.type = options.type;
    this.exitCode = options.exitCode;
    this.transient = options.transient ?? false;
    this.cause = options.cause;
  }
};
var formatZodMessage = (error) => {
  return error.issues.map((issue) => {
    const path = issue.path.length > 0 ? `${issue.path.join(".")}: ` : "";
    return `${path}${issue.message}`;
  }).join("; ");
};
var normalizeError = (error) => {
  if (error instanceof CliError) {
    return error;
  }
  if (error instanceof CommanderError) {
    return commanderErrorToCliError(error);
  }
  if (error instanceof ZodError) {
    return new CliError({
      type: "validation_error",
      message: formatZodMessage(error),
      exitCode: EXIT_CODES.VALIDATION,
      cause: error
    });
  }
  if (error instanceof Error) {
    if (error.type === "auth_error") {
      return new CliError({
        type: "auth_error",
        message: error.message,
        exitCode: EXIT_CODES.AUTH,
        cause: error
      });
    }
    if (error.type === "validation_error") {
      return new CliError({
        type: "validation_error",
        message: error.message,
        exitCode: EXIT_CODES.VALIDATION,
        cause: error
      });
    }
    return new CliError({
      type: "api_error",
      message: error.message,
      exitCode: EXIT_CODES.API,
      cause: error
    });
  }
  return new CliError({
    type: "api_error",
    message: "Unknown CLI error",
    exitCode: EXIT_CODES.API,
    cause: error
  });
};
var commanderErrorToCliError = (error) => {
  const cleanedMessage = error.message.replace(/^error:\s*/i, "").trim();
  if (error.code === "commander.helpDisplayed") {
    return new CliError({
      type: "api_error",
      message: cleanedMessage || "Help displayed",
      exitCode: EXIT_CODES.SUCCESS,
      cause: error
    });
  }
  return new CliError({
    type: "validation_error",
    message: cleanedMessage || "Invalid command invocation",
    exitCode: EXIT_CODES.VALIDATION,
    cause: error
  });
};

// src/core/browserAuth.ts
import { createServer } from "node:http";
import { randomBytes } from "node:crypto";
import { URL as URL2 } from "node:url";
var buildBrowserAuthUrl = (baseAppUrl, state, callbackUrl, client) => {
  const trimmedBaseUrl = baseAppUrl.replace(/\/$/, "");
  const params = new URLSearchParams({ state, callbackUrl });
  const label = client?.trim().slice(0, 64);
  if (label) params.set("client", label);
  return `${trimmedBaseUrl}/#/cli-auth?${params.toString()}`;
};
var createDeferred = () => {
  let resolve6;
  let reject;
  let settled = false;
  const promise = new Promise((innerResolve, innerReject) => {
    resolve6 = (value) => {
      settled = true;
      innerResolve(value);
    };
    reject = (reason) => {
      settled = true;
      innerReject(reason);
    };
  });
  return {
    promise,
    resolve: resolve6,
    reject,
    get settled() {
      return settled;
    }
  };
};
var readJsonBody = async (request) => {
  const chunks = [];
  for await (const chunk of request) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  const raw = Buffer.concat(chunks).toString("utf8").trim();
  if (!raw) return {};
  return JSON.parse(raw);
};
var writeJson = (response, statusCode, payload, baseAppUrl) => {
  response.statusCode = statusCode;
  const origin = new URL2(baseAppUrl).origin;
  response.setHeader("Access-Control-Allow-Origin", origin);
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");
  response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS, GET");
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.end(`${JSON.stringify(payload)}
`);
};
var writeHtml = (response, statusCode, html, baseAppUrl) => {
  response.statusCode = statusCode;
  const origin = new URL2(baseAppUrl).origin;
  response.setHeader("Access-Control-Allow-Origin", origin);
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");
  response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS, GET");
  response.setHeader("Content-Type", "text/html; charset=utf-8");
  response.end(html);
};
var createBrowserAuthSession = async (baseAppUrl, options = {}) => {
  const host = options.host || "127.0.0.1";
  const callbackPath = options.callbackPath || "/cli-auth/callback";
  const timeoutMs = options.timeoutMs ?? 18e4;
  const state = randomBytes(24).toString("hex");
  const deferredToken = createDeferred();
  let pendingError = null;
  const server = createServer(async (request, response) => {
    try {
      if (!request.url) {
        writeJson(response, 404, { ok: false, error: "Not found" }, baseAppUrl);
        return;
      }
      const requestUrl = new URL2(request.url, `http://${host}`);
      if (request.method === "OPTIONS") {
        writeJson(response, 204, {}, baseAppUrl);
        return;
      }
      if (request.method === "GET" && requestUrl.pathname === "/healthz") {
        writeJson(response, 200, { ok: true }, baseAppUrl);
        return;
      }
      if (request.method === "POST" && requestUrl.pathname === callbackPath) {
        let body;
        try {
          body = await readJsonBody(request);
        } catch {
          writeJson(response, 400, { ok: false, error: "Invalid JSON body" }, baseAppUrl);
          return;
        }
        if (!body || typeof body !== "object") {
          writeJson(response, 400, { ok: false, error: "Invalid JSON body" }, baseAppUrl);
          return;
        }
        const receivedState = typeof body.state === "string" ? body.state : "";
        const firebaseIdToken = typeof body.firebaseIdToken === "string" ? body.firebaseIdToken : "";
        const refreshToken = typeof body.refreshToken === "string" ? body.refreshToken : void 0;
        const apiKey = typeof body.apiKey === "string" ? body.apiKey : void 0;
        const appCheckToken = typeof body.appCheckToken === "string" && body.appCheckToken.trim() ? body.appCheckToken.trim() : void 0;
        if (receivedState !== state) {
          writeJson(response, 400, { ok: false, error: "Invalid state" }, baseAppUrl);
          return;
        }
        if (!firebaseIdToken) {
          writeJson(response, 400, { ok: false, error: "Missing firebaseIdToken" }, baseAppUrl);
          return;
        }
        try {
          decodeFirebaseIdTokenClaims(firebaseIdToken);
        } catch {
          writeJson(response, 400, { ok: false, error: "Invalid firebaseIdToken" }, baseAppUrl);
          return;
        }
        writeHtml(
          response,
          200,
          // Minuscule et autonome à dessein : cette page n'est vue que si le
          // navigateur de l'utilisateur atterrit sur le callback loopback du
          // CLI. Styles inline, aucune police ni ressource distante.
          [
            '<!doctype html><html lang="fr"><head><meta charset="utf-8" />',
            "<title>Beemm Vision \u2014 Connexion CLI</title></head>",
            '<body style="margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;',
            "background:#0A0A0A;color:#FFFFFF;",
            `font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">`,
            '<div style="max-width:420px;padding:32px 36px;border:1px solid #2A2A2A;border-radius:16px;',
            'background:#161616;text-align:center;">',
            '<p style="margin:0 0 12px;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;',
            'color:#10B981;">Beemm Vision</p>',
            '<h1 style="margin:0 0 8px;font-size:20px;font-weight:600;">Connexion termin\xE9e</h1>',
            '<p style="margin:0;font-size:14px;color:#CCCCCC;">',
            "Vous pouvez fermer cette fen\xEAtre et retourner au terminal.</p>",
            "</div></body></html>"
          ].join(""),
          baseAppUrl
        );
        if (!deferredToken.settled) {
          deferredToken.resolve({ firebaseIdToken, refreshToken, apiKey, appCheckToken });
        }
        return;
      }
      writeJson(response, 404, { ok: false, error: "Not found" }, baseAppUrl);
    } catch {
      if (!response.headersSent) {
        writeJson(response, 500, { ok: false, error: "Internal error" }, baseAppUrl);
      }
    }
  });
  await new Promise((resolve6, reject) => {
    server.listen(0, host, () => resolve6());
    server.once("error", reject);
  });
  const address = server.address();
  if (!address || typeof address === "string") {
    throw new Error("Unable to start local auth callback server.");
  }
  const callbackUrl = `http://${host}:${address.port}${callbackPath}`;
  const authUrl = buildBrowserAuthUrl(baseAppUrl, state, callbackUrl, options.client);
  const timeout = setTimeout(() => {
    if (!deferredToken.settled) {
      pendingError = new Error("Browser login timed out.");
    }
  }, timeoutMs);
  return {
    authUrl,
    state,
    callbackUrl,
    waitForToken: () => {
      const tokenPromise = (async () => {
        if (pendingError) {
          throw pendingError;
        }
        let pendingErrorWatcher = null;
        if (!deferredToken.settled) {
          pendingErrorWatcher = setInterval(() => {
            if (!pendingError) {
              return;
            }
            if (pendingErrorWatcher) {
              clearInterval(pendingErrorWatcher);
              pendingErrorWatcher = null;
            }
            if (!deferredToken.settled) {
              deferredToken.reject(pendingError);
            }
          }, 10);
        }
        try {
          return await deferredToken.promise;
        } finally {
          if (pendingErrorWatcher) {
            clearInterval(pendingErrorWatcher);
          }
          clearTimeout(timeout);
        }
      })();
      tokenPromise.catch(() => {
      });
      return tokenPromise;
    },
    close: async () => {
      clearTimeout(timeout);
      await new Promise((resolve6, reject) => {
        server.close((error) => {
          if (error) {
            reject(error);
            return;
          }
          resolve6();
        });
      });
    },
    getError: () => pendingError
  };
};

// src/core/appBaseUrl.ts
var LOOPBACK_HOSTS = /* @__PURE__ */ new Set(["localhost", "127.0.0.1", "[::1]"]);
var SAFE_HOSTNAME = /^[a-z0-9](?:[a-z0-9.-]*[a-z0-9])?$/;
var normalizeAppBaseUrl = (value) => {
  const refuse = () => {
    throw new CliError({
      type: "validation_error",
      message: `Invalid app base URL ${JSON.stringify(value)}: expected an https:// origin (http:// only for localhost or 127.0.0.1). Fix it with \`beemmvision config set --app-base-url <url>\` or BEEMMVISION_APP_BASE_URL.`,
      exitCode: EXIT_CODES.VALIDATION
    });
  };
  let url;
  try {
    url = new URL(value.trim());
  } catch {
    return refuse();
  }
  const loopback = LOOPBACK_HOSTS.has(url.hostname);
  if (url.protocol !== "https:" && !(url.protocol === "http:" && loopback)) {
    return refuse();
  }
  if (url.username || url.password) {
    return refuse();
  }
  if (!loopback && !SAFE_HOSTNAME.test(url.hostname)) {
    return refuse();
  }
  return url.origin;
};

// src/core/terminalText.ts
var TERMINAL_CONTROL_CHARACTERS = /[\u0000-\u0008\u000b-\u001f\u007f-\u009f]/g;
var sanitizeForTerminal = (value) => value.replace(/\r\n/g, "\n").replace(TERMINAL_CONTROL_CHARACTERS, (character) => `\\x${character.charCodeAt(0).toString(16).padStart(2, "0")}`);

// src/core/tokenArgvWarning.ts
var warnTokenOnCommandLine = (context) => {
  if (context.json) {
    return;
  }
  context.output.writeHuman(
    "Warning: a Firebase ID token passed on the command line is visible to other local users (ps, /proc) while the command runs. Prefer `beemmvision auth login` (browser) or the BEEMMVISION_FIREBASE_ID_TOKEN environment variable.\n",
    "stderr"
  );
};

// src/commands/auth.ts
var AuthLoginOptionsSchema = z.object({
  firebaseIdToken: z.string().min(1, "firebaseIdToken is required"),
  refreshToken: z.string().optional(),
  apiKey: z.string().optional(),
  /**
   * Attestation App Check obtenue dans le navigateur. Absente d'un login par
   * `--firebase-id-token`, et absente aussi d'un login navigateur ou App Check
   * n'etait pas actif : dans les deux cas le login reussit, en mode degrade.
   */
  appCheckToken: z.string().optional()
});
var AuthWhoamiOptionsSchema = z.object({}).passthrough();
var AuthLogoutOptionsSchema = z.object({}).passthrough();
var AuthRefreshOptionsSchema = z.object({}).passthrough();
var AuthLoginBrowserOptionsSchema = z.object({
  // `--no-open` : Commander le range sous `open` (false), jamais sous
  // `noOpen`. L'ancien schema lisait `noOpen`, toujours absent, et le
  // navigateur s'ouvrait quoi qu'on demande (SEC-CLI-003).
  open: z.boolean().optional(),
  timeoutSeconds: z.number().int().positive().max(900).optional(),
  force: z.boolean().default(false)
});
var buildAuthSource = (context) => context.runtimeConfig.firebaseIdTokenSource;
var APP_CHECK_RECONNECT_ADVICE = "Run `beemmvision auth login` to attest this CLI: the page that opens solves a real Turnstile in your browser and hands the App Check token to the CLI. It lasts one hour, like the session.";
var describeAppCheck = (credential) => ({
  present: credential.present,
  expired: credential.expired,
  expiresAt: credential.expiresAt ?? null,
  expiresInSeconds: credential.expiresInSeconds ?? null,
  advice: credential.present && !credential.expired ? null : APP_CHECK_RECONNECT_ADVICE
});
var isSessionFullyAttested = (hasIdentityToken, appCheck) => hasIdentityToken && appCheck.present && !appCheck.expired;
var authLoginHandler = async (options, context) => {
  const claims = decodeFirebaseIdTokenClaims(options.firebaseIdToken);
  const authFilePath = storeAuthSession(
    {
      firebaseIdToken: options.firebaseIdToken,
      refreshToken: options.refreshToken,
      apiKey: options.apiKey,
      appCheckToken: options.appCheckToken
    },
    context.env
  );
  console.log(`[auth.login] Firebase ID token stored in ${authFilePath}`);
  const appCheck = readStoredAppCheckCredential(context.env);
  if (appCheck.present) {
    console.log(
      `[auth.login] App Check attestation stored (expires ${appCheck.expiresAt ?? "unknown"}).`
    );
  } else {
    console.log(
      "[auth.login] No App Check attestation in this session: endpoints that enforce App Check will refuse this CLI. Sign in through the browser (`beemmvision auth login`) to get one."
    );
  }
  return {
    stored: true,
    authFilePath,
    subject: typeof claims.user_id === "string" ? claims.user_id : claims.sub,
    email: typeof claims.email === "string" ? claims.email : null,
    source: "cli",
    appCheck: describeAppCheck(appCheck)
  };
};
var authWhoamiHandler = async (_options, context) => {
  const token = context.runtimeConfig.firebaseIdToken;
  if (!token) {
    throw new CliError({
      type: "auth_error",
      message: "No Firebase ID token configured. Use `auth login --firebase-id-token <token>` or set BEEMMVISION_FIREBASE_ID_TOKEN.",
      exitCode: EXIT_CODES.AUTH
    });
  }
  const claims = decodeFirebaseIdTokenClaims(token);
  console.log(`[auth.whoami] Firebase ID token loaded from ${buildAuthSource(context)}`);
  const appCheck = readStoredAppCheckCredential(context.env);
  console.log(
    appCheck.present ? `[auth.whoami] App Check token ${appCheck.expired ? "EXPIRED at" : "valid until"} ${appCheck.expiresAt ?? "unknown"}` : "[auth.whoami] No App Check token in this session (degraded: endpoints enforcing App Check will refuse)."
  );
  return {
    source: buildAuthSource(context),
    authFilePath: getVisionboardAuthFilePath(context.env),
    subject: typeof claims.user_id === "string" ? claims.user_id : claims.sub,
    email: typeof claims.email === "string" ? claims.email : null,
    audience: typeof claims.aud === "string" ? claims.aud : null,
    issuer: typeof claims.iss === "string" ? claims.iss : null,
    expiresAtEpochSeconds: typeof claims.exp === "number" ? claims.exp : null,
    appCheck: describeAppCheck(appCheck)
  };
};
var authLogoutHandler = async (_options, context) => {
  const authFilePath = clearStoredFirebaseIdToken(context.env);
  console.log(`[auth.logout] Cleared stored Firebase ID token from ${authFilePath}`);
  return {
    cleared: true,
    authFilePath
  };
};
var authRefreshHandler = async (_options, context) => {
  const newToken = await refreshFirebaseIdToken(context.env);
  if (!newToken) {
    throw new CliError({
      type: "auth_error",
      message: "Failed to refresh Firebase ID token. You may need to run `auth login` again.",
      exitCode: EXIT_CODES.AUTH
    });
  }
  console.log(`[auth.refresh] Firebase ID token refreshed successfully.`);
  return {
    refreshed: true
  };
};
var registerAuthCommands = (program, context) => {
  const authCommand = program.command("auth").description("Manage CLI Firebase authentication state");
  authCommand.command("login").description("Store a Firebase ID token in the local CLI config, or start browser login when no token is provided").option("--token <token>", "Firebase ID token to store locally").option("--firebase-id-token <token>", "Firebase ID token to store locally").option("--no-open", "Do not attempt to open the browser automatically").option("--timeout-seconds <seconds>", "Browser login timeout in seconds", (value) => Number(value)).option("--force", "Force re-login even if already authenticated").action(async (rawOptions) => {
    context.commandName = "auth.login";
    const routedFirebaseIdToken = context.runtimeConfig.firebaseIdTokenSource === "cli" ? context.runtimeConfig.firebaseIdToken : void 0;
    const firebaseIdToken = rawOptions.token ?? rawOptions.firebaseIdToken ?? routedFirebaseIdToken;
    if (typeof firebaseIdToken === "string" && firebaseIdToken.trim()) {
      if (rawOptions.token !== void 0 || rawOptions.firebaseIdToken !== void 0) {
        warnTokenOnCommandLine(context);
      }
      const parsedOptions = AuthLoginOptionsSchema.parse({ firebaseIdToken });
      const result = await authLoginHandler(parsedOptions, context);
      console.log("[auth.login] Login completed successfully.");
      context.response = createSuccessResponse("auth.login", result, context.output.logs);
      return;
    }
    const browserOptions = AuthLoginBrowserOptionsSchema.parse(rawOptions);
    const existingAppCheck = readStoredAppCheckCredential(context.env);
    const fullyAttested = isSessionFullyAttested(
      Boolean(context.runtimeConfig.firebaseIdToken),
      existingAppCheck
    );
    if (!browserOptions.force && fullyAttested) {
      const claims = decodeFirebaseIdTokenClaims(context.runtimeConfig.firebaseIdToken);
      const email = typeof claims.email === "string" ? claims.email : null;
      if (email) {
        context.output.writeStyled(`
\u2705 Already logged in as \x1B[36m${sanitizeForTerminal(email)}\x1B[0m

`);
        console.log(`   To re-login, run: beemmvision auth login --force
`);
        context.response = createSuccessResponse("auth.login", { email, alreadyLoggedIn: true }, context.output.logs);
        return;
      }
    }
    if (!browserOptions.force && context.runtimeConfig.firebaseIdToken && !fullyAttested) {
      console.log(
        existingAppCheck.present ? "[auth.login] Signed in, but the App Check attestation expired \u2014 re-attesting through the browser." : "[auth.login] Signed in, but this session carries no App Check attestation \u2014 re-attesting through the browser."
      );
    }
    const appBaseUrl = normalizeAppBaseUrl(context.runtimeConfig.appBaseUrl);
    const session = await createBrowserAuthSession(appBaseUrl, {
      client: "terminal",
      timeoutMs: (browserOptions.timeoutSeconds ?? 180) * 1e3
    });
    try {
      console.log(`[auth.login] Browser login URL: ${session.authUrl}`);
      console.log("[auth.login] Waiting for browser authentication...");
      if (browserOptions.open !== false) {
        try {
          const { default: open } = await import("open");
          await open(session.authUrl);
          console.log("[auth.login] Browser opened automatically.");
        } catch (error) {
          console.log(`[auth.login] Unable to open browser automatically: ${error instanceof Error ? error.message : String(error)}`);
        }
      }
      const {
        firebaseIdToken: firebaseIdTokenFromBrowser,
        refreshToken,
        apiKey,
        appCheckToken
      } = await session.waitForToken();
      const parsedOptions = AuthLoginOptionsSchema.parse({
        firebaseIdToken: firebaseIdTokenFromBrowser,
        refreshToken,
        apiKey,
        appCheckToken
      });
      const result = await authLoginHandler(parsedOptions, context);
      console.log("[auth.login] Browser authentication completed successfully.");
      const tokenAudience = getFirebaseTokenAudience(firebaseIdTokenFromBrowser);
      context.response = createSuccessResponse("auth.login", {
        ...result,
        authUrl: session.authUrl,
        callbackUrl: session.callbackUrl,
        browserFlow: true,
        tokenAudience
      }, context.output.logs);
    } finally {
      await session.close();
    }
  });
  authCommand.command("whoami").description("Inspect the current Firebase ID token configured for the CLI").action(
    createCommandAction({
      context,
      commandName: "auth.whoami",
      schema: AuthWhoamiOptionsSchema,
      handler: authWhoamiHandler
    })
  );
  authCommand.command("logout").description("Clear the locally stored Firebase ID token").action(
    createCommandAction({
      context,
      commandName: "auth.logout",
      schema: AuthLogoutOptionsSchema,
      handler: authLogoutHandler
    })
  );
  authCommand.command("refresh").description("Refresh the locally stored Firebase ID token using the refresh token").action(
    createCommandAction({
      context,
      commandName: "auth.refresh",
      schema: AuthRefreshOptionsSchema,
      handler: authRefreshHandler
    })
  );
};

// src/commands/config.ts
import { z as z2 } from "zod";

// src/core/localConfig.ts
import { existsSync as existsSync2, mkdirSync as mkdirSync2, readFileSync as readFileSync2, writeFileSync as writeFileSync2, unlinkSync } from "node:fs";
import { dirname as dirname2, join as join2 } from "node:path";
import { homedir as homedir2 } from "node:os";
var resolveConfigHome2 = (env) => {
  if (env.XDG_CONFIG_HOME && env.XDG_CONFIG_HOME.trim()) {
    return env.XDG_CONFIG_HOME;
  }
  if (env.HOME && env.HOME.trim()) {
    return join2(env.HOME, ".config");
  }
  return join2(homedir2(), ".config");
};
var getVisionboardConfigFilePath = (env = process.env) => {
  const configFile = readCliEnvVar(env, "CONFIG_FILE");
  if (configFile) {
    return configFile;
  }
  return join2(resolveConfigHome2(env), CLI_CONFIG_DIRECTORY_NAME, "config.json");
};
var loadVisionboardCliConfig = (env = process.env) => {
  const configFilePath = getVisionboardConfigFilePath(env);
  if (!existsSync2(configFilePath)) {
    return {};
  }
  try {
    const raw = readFileSync2(configFilePath, "utf8");
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
};
var writeVisionboardCliConfig = (patch, env = process.env) => {
  const configFilePath = getVisionboardConfigFilePath(env);
  const current = loadVisionboardCliConfig(env);
  const next = {
    ...current,
    ...patch,
    updatedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  mkdirSync2(dirname2(configFilePath), { recursive: true });
  writeFileSync2(configFilePath, `${JSON.stringify(next, null, 2)}
`, "utf8");
  return configFilePath;
};
var clearVisionboardCliConfig = (env = process.env) => {
  const configFilePath = getVisionboardConfigFilePath(env);
  if (existsSync2(configFilePath)) {
    unlinkSync(configFilePath);
  }
  return configFilePath;
};

// src/commands/config.ts
import { readFileSync as readFileSync3 } from "node:fs";
var ConfigRawOptionsSchema = z2.object({
  functionsBaseUrl: z2.string().optional(),
  appBaseUrl: z2.string().optional(),
  functionsBaseURL: z2.string().optional(),
  appBaseURL: z2.string().optional()
});
var ConfigSetOptionsSchema = z2.object({
  functionsBaseUrl: z2.string().url().optional(),
  appBaseUrl: z2.string().url().optional()
});
var ConfigShowOptionsSchema = z2.object({}).passthrough();
var ConfigClearOptionsSchema = z2.object({}).passthrough();
var configShowHandler = async (_options, context) => {
  const storedConfig = loadVisionboardCliConfig(context.env);
  console.log("[config.show] Loaded CLI configuration");
  return {
    configFilePath: getVisionboardConfigFilePath(context.env),
    storedConfig,
    effective: {
      functionsBaseUrl: context.runtimeConfig.functionsBaseUrl || null,
      functionsBaseUrlSource: context.runtimeConfig.functionsBaseUrlSource,
      appBaseUrl: context.runtimeConfig.appBaseUrl,
      appBaseUrlSource: context.runtimeConfig.appBaseUrlSource,
      currentProjectId: context.runtimeConfig.currentProjectId || null,
      firebaseIdTokenSource: context.runtimeConfig.firebaseIdTokenSource
    }
  };
};
var configClearHandler = async (_options, context) => {
  const configFilePath = clearVisionboardCliConfig(context.env);
  console.log(`[config.clear] Cleared CLI configuration from ${configFilePath}`);
  return {
    configFilePath,
    cleared: true
  };
};
var registerConfigCommands = (program, context) => {
  const configCommand = program.command("config").description("Manage persistent CLI configuration");
  configCommand.command("show").description("Show stored and effective CLI configuration").action(
    createCommandAction({
      context,
      commandName: "config.show",
      schema: ConfigShowOptionsSchema,
      handler: configShowHandler
    })
  );
  configCommand.command("clear").description("Clear persistent CLI configuration").action(
    createCommandAction({
      context,
      commandName: "config.clear",
      schema: ConfigClearOptionsSchema,
      handler: configClearHandler
    })
  );
  configCommand.command("set").description("Persist app/functions URLs for deployed usage").option("--functions-base-url <url>", "Callable Functions base URL").option("--app-base-url <url>", "App base URL used by browser auth").action(async (rawOptions) => {
    context.commandName = "config.set";
    const raw = ConfigRawOptionsSchema.parse(rawOptions);
    const appBaseUrl = raw.appBaseUrl || raw.appBaseURL;
    const routedFunctionsBaseUrl = context.runtimeConfig.functionsBaseUrlSource === "cli" ? context.runtimeConfig.functionsBaseUrl : void 0;
    const normalized = {
      functionsBaseUrl: routedFunctionsBaseUrl || raw.functionsBaseUrl || raw.functionsBaseURL,
      // Seule l'origine est persistee, et seulement si elle est sure : elle
      // resservira a chaque `auth login` (SEC-CLI-002).
      appBaseUrl: appBaseUrl ? normalizeAppBaseUrl(appBaseUrl) : void 0
    };
    if (!normalized.functionsBaseUrl && !normalized.appBaseUrl) {
      throw new CliError({
        type: "validation_error",
        message: "config set requires at least one of --functions-base-url or --app-base-url.",
        exitCode: EXIT_CODES.VALIDATION
      });
    }
    const parsedOptions = ConfigSetOptionsSchema.parse(normalized);
    const configFilePath = writeVisionboardCliConfig(parsedOptions, context.env);
    const rawFile = readFileSync3(configFilePath, "utf8");
    console.log(`[config.set] Updated CLI configuration in ${configFilePath}`);
    context.response = createSuccessResponse("config.set", {
      configFilePath,
      storedConfig: JSON.parse(rawFile)
    }, context.output.logs);
  });
};

// src/commands/doctor.ts
import { z as z3 } from "zod";
import { statSync } from "node:fs";
import { win32 as win32Path } from "node:path";
var DoctorOptionsSchema = z3.object({
  fix: z3.boolean().optional().default(false)
});
var resolveWindowsJavaPath = (env, isFile = (candidate) => {
  try {
    return statSync(candidate).isFile();
  } catch {
    return false;
  }
}) => {
  const pathKey = Object.keys(env).find((key) => key.toUpperCase() === "PATH");
  const rawPath = pathKey ? env[pathKey] ?? "" : "";
  for (const rawEntry of rawPath.split(";")) {
    const entry = rawEntry.trim().replace(/^"(.*)"$/, "$1");
    if (!entry || !/^(?:[A-Za-z]:[\\/]|\\\\)/.test(entry)) {
      continue;
    }
    const candidate = win32Path.join(entry, "java.exe");
    if (isFile(candidate)) {
      return candidate;
    }
  }
  return null;
};
var detectJava = async (env) => {
  try {
    const { execFile } = await import("node:child_process");
    const { promisify } = await import("node:util");
    const execFileAsync = promisify(execFile);
    let javaExecutable = "java";
    if (process.platform === "win32") {
      const resolved = resolveWindowsJavaPath(env);
      if (!resolved) {
        return { available: false, details: "java.exe not found in an absolute PATH entry" };
      }
      javaExecutable = resolved;
    }
    const result = await execFileAsync(javaExecutable, ["-version"]);
    return {
      available: true,
      details: (result.stderr || result.stdout || "").trim()
    };
  } catch (error) {
    return {
      available: false,
      details: error instanceof Error ? error.message : "java -version failed"
    };
  }
};
var doctorHandler = async (options, context) => {
  const java = await detectJava(context.env);
  const transportTarget = context.describeTransport();
  const tokenAudience = context.runtimeConfig.firebaseIdToken ? getFirebaseTokenAudience(context.runtimeConfig.firebaseIdToken) : void 0;
  const tokenInspection = (() => {
    const token = context.runtimeConfig.firebaseIdToken;
    if (!token) {
      return {
        present: false,
        validFormat: false,
        message: "Missing Firebase ID token for callable transport."
      };
    }
    const parts = token.split(".");
    if (parts.length !== 3) {
      return {
        present: true,
        validFormat: false,
        message: "Firebase ID token is present but malformed or truncated; expected a JWT with 3 segments. A header-only token like eyJ... is not usable."
      };
    }
    return {
      present: true,
      validFormat: true,
      message: `Firebase ID token configured via ${context.runtimeConfig.firebaseIdTokenSource}.`
    };
  })();
  const callableConfigured = Boolean(
    context.runtimeConfig.functionsBaseUrl && tokenInspection.validFormat
  );
  const appCheck = readStoredAppCheckCredential(context.env);
  const appCheckMessage = !appCheck.present ? "No App Check attestation in this session. Endpoints that enforce App Check (projects, workflows, credits) will answer 401. Run `beemmvision auth login` to attest this CLI through your browser." : appCheck.expired ? `App Check attestation expired at ${appCheck.expiresAt}. Run \`beemmvision auth login\` again (an attestation lasts one hour, like the session).` : `App Check attestation valid until ${appCheck.expiresAt ?? "an unreadable date"}.`;
  const checks = [
    {
      id: "transport-resolution",
      ok: transportTarget !== "not_configured",
      message: transportTarget === "not_configured" ? "No transport configured: server commands will fail until you run `auth login` (or pass --transport mock)." : `Transport that would be used: ${transportTarget}`
    },
    {
      id: "functions-base-url",
      ok: Boolean(context.runtimeConfig.functionsBaseUrl),
      message: context.runtimeConfig.functionsBaseUrl ? `Functions base URL configured via ${context.runtimeConfig.functionsBaseUrlSource}: ${context.runtimeConfig.functionsBaseUrl}` : "Missing Functions base URL for callable transport."
    },
    {
      id: "app-base-url",
      ok: Boolean(context.runtimeConfig.appBaseUrl),
      message: `Browser auth app base URL via ${context.runtimeConfig.appBaseUrlSource}: ${context.runtimeConfig.appBaseUrl}`
    },
    {
      id: "firebase-id-token",
      ok: tokenInspection.validFormat,
      message: tokenInspection.message
    },
    {
      id: "firebase-token-audience",
      ok: Boolean(tokenAudience),
      message: tokenAudience ? `Firebase ID token audience: ${tokenAudience}` : "Firebase ID token audience unavailable."
    },
    {
      id: "app-check-token",
      ok: appCheck.present && !appCheck.expired,
      message: appCheckMessage
    },
    {
      id: "callable-ready",
      ok: callableConfigured,
      message: callableConfigured ? "Callable transport prerequisites are present." : "Callable transport prerequisites are incomplete."
    },
    {
      id: "current-project",
      ok: Boolean(context.runtimeConfig.currentProjectId),
      message: context.runtimeConfig.currentProjectId ? `Current project configured: ${context.runtimeConfig.currentProjectId}` : "No current project configured; use `project use --project-id <id>` to avoid repeating it."
    },
    {
      id: "backend-mode",
      ok: true,
      message: context.runtimeConfig.functionsBaseUrl?.includes("127.0.0.1") || context.runtimeConfig.functionsBaseUrl?.includes("localhost") ? "Callable backend target appears to be local/emulator." : "Callable backend target appears to be remote/cloud or not configured."
    },
    {
      id: "java-runtime",
      ok: java.available,
      message: java.available ? "Java runtime detected for Firebase Firestore emulator." : "Java runtime missing; Firestore emulator and emulator integration tests will fail.",
      details: java.details
    }
  ];
  const fixesApplied = [];
  if (options.fix) {
    if (!context.runtimeConfig.appBaseUrl || context.runtimeConfig.appBaseUrlSource === "default") {
      const defaultAppUrl = "https://app.beemmvision.com";
      writeVisionboardCliConfig({ appBaseUrl: defaultAppUrl }, context.env);
      fixesApplied.push(`Set default app-base-url to ${defaultAppUrl}`);
      console.log(`[doctor.fix] Set default app-base-url to ${defaultAppUrl}`);
    }
    if (!context.runtimeConfig.currentProjectId) {
      console.log("[doctor.fix] No current project configured. Use `project use --project-id <id>` to set one.");
    }
    if (!context.runtimeConfig.functionsBaseUrl) {
      console.log("[doctor.fix] Functions base URL is missing. Set it with `config set --functions-base-url <url>` for callable transport.");
    }
    if (!context.runtimeConfig.firebaseIdToken) {
      console.log("[doctor.fix] Firebase ID token is missing. Use `auth login` to authenticate.");
    }
    if (!appCheck.present || appCheck.expired) {
      console.log("[doctor.fix] App Check attestation missing or expired. Use `auth login` to get a fresh one.");
    }
  }
  checks.forEach((check) => {
    console.log(`[doctor] ${check.ok ? "OK" : "FAIL"} ${check.id}: ${check.message}`);
  });
  if (options.fix && fixesApplied.length > 0) {
    console.log(`[doctor] ${fixesApplied.length} fix(es) applied.`);
  }
  return {
    transport: transportTarget,
    callableConfigured,
    appCheck: {
      present: appCheck.present,
      expired: appCheck.expired,
      expiresAt: appCheck.expiresAt ?? null,
      expiresInSeconds: appCheck.expiresInSeconds ?? null
    },
    checks,
    fixesApplied
  };
};
var registerDoctorCommand = (program, context) => {
  program.command("doctor").description("Inspect CLI runtime prerequisites and emulator readiness").option("--fix", "Attempt to automatically fix common configuration issues").action(
    createCommandAction({
      context,
      commandName: "doctor",
      schema: DoctorOptionsSchema,
      handler: doctorHandler
    })
  );
};

// src/commands/project.ts
import { z as z5 } from "zod";

// src/contracts/catalog.ts
var import_catalog = __toESM(require_catalog(), 1);

// src/core/localProject.ts
import { existsSync as existsSync3, mkdirSync as mkdirSync3, readFileSync as readFileSync4, rmSync as rmSync2, writeFileSync as writeFileSync3 } from "node:fs";
import { dirname as dirname3, join as join3 } from "node:path";
import { homedir as homedir3 } from "node:os";
var resolveConfigHome3 = (env) => {
  if (env.XDG_CONFIG_HOME && env.XDG_CONFIG_HOME.trim()) {
    return env.XDG_CONFIG_HOME;
  }
  if (env.HOME && env.HOME.trim()) {
    return join3(env.HOME, ".config");
  }
  return join3(homedir3(), ".config");
};
var getVisionboardProjectFilePath = (env = process.env) => {
  const projectFile = readCliEnvVar(env, "PROJECT_FILE");
  if (projectFile) {
    return projectFile;
  }
  return join3(resolveConfigHome3(env), CLI_CONFIG_DIRECTORY_NAME, "project.json");
};
var loadStoredProjectId = (env = process.env) => {
  const projectFilePath = getVisionboardProjectFilePath(env);
  if (!existsSync3(projectFilePath)) {
    return void 0;
  }
  try {
    const raw = readFileSync4(projectFilePath, "utf8");
    const parsed = JSON.parse(raw);
    return typeof parsed.projectId === "string" && parsed.projectId.trim() ? parsed.projectId.trim() : void 0;
  } catch {
    return void 0;
  }
};
var storeProjectId = (projectId, env = process.env) => {
  const projectFilePath = getVisionboardProjectFilePath(env);
  mkdirSync3(dirname3(projectFilePath), { recursive: true });
  writeFileSync3(
    projectFilePath,
    `${JSON.stringify({ projectId, updatedAt: (/* @__PURE__ */ new Date()).toISOString() }, null, 2)}
`,
    "utf8"
  );
  return projectFilePath;
};
var clearStoredProjectId = (env = process.env) => {
  const projectFilePath = getVisionboardProjectFilePath(env);
  rmSync2(projectFilePath, { force: true });
  return projectFilePath;
};

// src/commands/project/create.ts
import { z as z4 } from "zod";
var ProjectCreateOptionsSchema = z4.object({
  name: z4.string().min(1, "Project name is required"),
  setAsCurrent: z4.boolean().default(true)
});
var projectCreateHandler = async (options, context) => {
  const result = await context.transport.createProject({ name: options.name });
  if (options.setAsCurrent && result.projectId) {
    storeProjectId(result.projectId, context.env);
  }
  if (!context.json) {
    context.output.writeHuman(`\u2705 Project created: "${result.name}" (${result.projectId})
`);
    if (options.setAsCurrent) {
      context.output.writeHuman(`   Set as current project.
`);
    }
  }
  return {
    projectId: result.projectId,
    name: result.name,
    setAsCurrent: options.setAsCurrent,
    transport: context.transport.kind
  };
};
var registerProjectCreateCommand = (projectCommand, context) => {
  projectCommand.command("create").description("Create a new project").requiredOption("--name <name>", "Name of the new project").option("--no-set-as-current", "Do not set the new project as the current project").action(
    createCommandAction({
      context,
      commandName: "project.create",
      schema: ProjectCreateOptionsSchema,
      handler: projectCreateHandler
    })
  );
};

// src/commands/project.ts
var ProjectListOptionsSchema = z5.object({
  type: z5.enum(["board", "workflow"]).optional()
});
var ProjectUseOptionsSchema = z5.object({ projectId: z5.string().min(1, "projectId is required") });
var ProjectCurrentOptionsSchema = z5.object({}).passthrough();
var projectListHandler = async (options, context) => {
  const rawResult = await context.transport.listProjects({ type: options.type });
  const result = import_catalog.ProjectListResultSchema.parse(rawResult);
  if (!context.json) {
    if (result.projectCount === 0) {
      context.output.writeHuman("No projects found.\n");
    } else {
      context.output.writeHuman(`Found ${result.projectCount} project(s):
`);
      result.projects.forEach((project) => {
        const current = context.runtimeConfig.currentProjectId === project.projectId ? " (current)" : "";
        context.output.writeHuman(`  ${project.projectId} - ${project.name}${current}
`);
      });
    }
  }
  return {
    transport: context.transport.kind,
    ...result
  };
};
var projectCurrentHandler = async (_options, context) => {
  const projectId = loadStoredProjectId(context.env) || null;
  console.log(`[project.current] ${projectId ? "Current project loaded" : "No current project configured"}`);
  return {
    projectId,
    projectFilePath: getVisionboardProjectFilePath(context.env)
  };
};
var registerProjectCommands = (program, context) => {
  const projectCommand = program.command("project").description("List and manage the current project context");
  registerProjectCreateCommand(projectCommand, context);
  projectCommand.command("list").description("List accessible projects").option("--type <type>", "Filter by project type (board|workflow)").action(
    createCommandAction({
      context,
      commandName: "project.list",
      schema: ProjectListOptionsSchema,
      handler: projectListHandler
    })
  );
  projectCommand.command("use").description("Store the current project id locally").requiredOption("--project-id <projectId>", "Project identifier").action(async (rawOptions) => {
    context.commandName = "project.use";
    const parsedOptions = ProjectUseOptionsSchema.parse(rawOptions);
    const projectFilePath = storeProjectId(parsedOptions.projectId, context.env);
    console.log(`[project.use] Current project stored in ${projectFilePath}`);
    context.response = createSuccessResponse("project.use", {
      projectId: parsedOptions.projectId,
      projectFilePath
    }, context.output.logs);
  });
  projectCommand.command("current").description("Read the current stored project context").action(
    createCommandAction({
      context,
      commandName: "project.current",
      schema: ProjectCurrentOptionsSchema,
      handler: projectCurrentHandler
    })
  );
  projectCommand.command("clear").description("Clear the stored project context").action(async () => {
    context.commandName = "project.clear";
    const projectFilePath = clearStoredProjectId(context.env);
    console.log(`[project.clear] Cleared current project from ${projectFilePath}`);
    context.response = createSuccessResponse("project.clear", {
      cleared: true,
      projectFilePath
    }, context.output.logs);
  });
};

// src/commands/template.ts
import { z as z6 } from "zod";
var TemplateListOptionsSchema = z6.object({}).passthrough();
var TemplateGetOptionsSchema = z6.object({ templateId: z6.string().min(1, "templateId is required") });
var TemplateCloneOptionsSchema = z6.object({ templateId: z6.string().min(1, "templateId is required") });
var templateListHandler = async (_options, context) => {
  const result = import_catalog.TemplateListResultSchema.parse(await context.transport.listTemplates());
  console.log(`[template.list] ${context.transport.kind} listed templates`);
  if (context.transport.kind === "callable" && result.templateCount === 0) {
    console.log("[template.list] No approved templates were returned by the callable backend. Seed templates in Firestore or switch to mock transport for local contract testing.");
  }
  return {
    transport: context.transport.kind,
    ...result
  };
};
var templateGetHandler = async (options, context) => {
  const result = import_catalog.TemplateGetResultSchema.parse(
    await context.transport.getTemplate({ templateId: options.templateId })
  );
  console.log(`[template.get] ${context.transport.kind} fetched template ${options.templateId}`);
  return {
    transport: context.transport.kind,
    ...result
  };
};
var templateCloneHandler = async (options, context) => {
  const result = import_catalog.TemplateDuplicateResultSchema.parse(
    await context.transport.duplicateTemplate({ templateId: options.templateId })
  );
  console.log(`[template.clone] ${context.transport.kind} duplicated template ${options.templateId}`);
  return {
    transport: context.transport.kind,
    ...result
  };
};
var registerTemplateCommands = (program, context) => {
  const templateCommand = program.command("template").description("List, inspect, and duplicate workflow templates");
  templateCommand.command("list").description("List available community templates").action(
    createCommandAction({
      context,
      commandName: "template.list",
      schema: TemplateListOptionsSchema,
      handler: templateListHandler
    })
  );
  templateCommand.command("get").description("Fetch a template and its portable workflow document").requiredOption("--template-id <templateId>", "Template identifier").action(
    createCommandAction({
      context,
      commandName: "template.get",
      schema: TemplateGetOptionsSchema,
      handler: templateGetHandler
    })
  );
  templateCommand.command("clone").description("Duplicate a community template into a new workflow project").requiredOption("--template-id <templateId>", "Template identifier").action(
    createCommandAction({
      context,
      commandName: "template.clone",
      schema: TemplateCloneOptionsSchema,
      handler: templateCloneHandler
    })
  );
};

// src/commands/workflow/duplicate.ts
import { z as z7 } from "zod";

// src/core/projectResolver.ts
var resolveProjectIdOrThrow = (explicitProjectId, currentProjectId) => {
  const projectId = explicitProjectId || currentProjectId;
  if (!projectId) {
    throw new CliError({
      type: "validation_error",
      message: "projectId is required. Use --project-id or configure a current project with `project use`.",
      exitCode: EXIT_CODES.VALIDATION
    });
  }
  return projectId;
};

// src/commands/workflow/duplicate.ts
var WorkflowDuplicateOptionsSchema = z7.object({
  projectId: z7.string().min(1).optional(),
  workflowId: z7.string().min(1, "workflowId is required"),
  name: z7.string().min(1).optional()
});
var workflowDuplicateHandler = async (options, context) => {
  const projectId = resolveProjectIdOrThrow(options.projectId, context.runtimeConfig.currentProjectId);
  const exportedWorkflow = await context.transport.exportWorkflow({
    projectId,
    workflowId: options.workflowId
  });
  const newName = options.name || `${exportedWorkflow.workflow.name} (Copy)`;
  const newWorkflowId = `wf-${Date.now()}`;
  const result = await context.transport.importWorkflow({
    projectId,
    workflowId: newWorkflowId,
    payload: {
      ...exportedWorkflow,
      workflow: {
        ...exportedWorkflow.workflow,
        name: newName
      }
    }
  });
  if (!context.json) {
    context.output.writeHuman(`\u2705 Workflow duplicated: ${newName}
`);
    context.output.writeHuman(`   Project: ${projectId}
`);
    context.output.writeHuman(`   New workflow id: ${newWorkflowId}
`);
    context.output.writeHuman(`   Nodes: ${result.importedNodeCount} | Edges: ${result.importedEdgeCount}

`);
  }
  return {
    projectId,
    sourceWorkflowId: options.workflowId,
    newWorkflowId,
    newName,
    transport: context.transport.kind,
    ...result
  };
};
var registerWorkflowDuplicateCommand = (workflowCommand, context) => {
  workflowCommand.command("duplicate").description("Duplicate an existing workflow into a new one").option("--project-id <projectId>", "Target project identifier").requiredOption("--workflow-id <workflowId>", "Source workflow identifier to duplicate").option("--name <name>", 'Name for the duplicated workflow (default: original name + " (Copy)")').action(
    createCommandAction({
      context,
      commandName: "workflow.duplicate",
      schema: WorkflowDuplicateOptionsSchema,
      handler: workflowDuplicateHandler
    })
  );
};

// src/commands/workflow/export.ts
import { dirname as dirname4, resolve } from "node:path";
import { mkdir, writeFile } from "node:fs/promises";
import { z as z8 } from "zod";

// src/contracts/portableWorkflow.ts
var import_portableWorkflow = __toESM(require_portableWorkflow(), 1);

// src/commands/workflow/export.ts
var WorkflowExportOptionsSchema = z8.object({
  projectId: z8.string().min(1).optional(),
  workflowId: z8.string().min(1, "workflowId is required"),
  output: z8.string().min(1).optional()
});
var persistPortableWorkflow = async (outputPath, portableWorkflow) => {
  const resolvedPath = resolve(outputPath);
  await mkdir(dirname4(resolvedPath), { recursive: true });
  await writeFile(resolvedPath, `${JSON.stringify(portableWorkflow, null, 2)}
`, "utf8");
  return resolvedPath;
};
var workflowExportHandler = async (options, context) => {
  const projectId = resolveProjectIdOrThrow(options.projectId, context.runtimeConfig.currentProjectId);
  const portableWorkflow = import_portableWorkflow.PortableWorkflowExportSchema.parse(
    await context.transport.exportWorkflow({
      projectId,
      workflowId: options.workflowId
    })
  );
  let outputPath = null;
  if (options.output) {
    outputPath = await persistPortableWorkflow(options.output, portableWorkflow);
  }
  console.log(`[workflow.export] ${context.transport.kind} export completed for ${projectId}/${options.workflowId}`);
  if (outputPath) {
    console.log(`[workflow.export] Portable workflow written to ${outputPath}`);
  }
  return {
    projectId,
    workflowId: options.workflowId,
    transport: context.transport.kind,
    outputPath,
    portableWorkflow
  };
};
var registerWorkflowExportCommand = (workflowCommand, context) => {
  workflowCommand.command("export").description("Export a Beemm Vision portable workflow document").option("--project-id <projectId>", "Target project identifier").requiredOption("--workflow-id <workflowId>", "Target workflow identifier").option("--output <path>", "Write the portable workflow JSON to a file").action(
    createCommandAction({
      context,
      commandName: "workflow.export",
      schema: WorkflowExportOptionsSchema,
      handler: workflowExportHandler
    })
  );
};

// src/commands/workflow/generateImportRun.ts
import { mkdir as mkdir2, writeFile as writeFile2 } from "node:fs/promises";
import { dirname as dirname5, resolve as resolve2 } from "node:path";
import { z as z9 } from "zod";

// src/contracts/samyWorkflow.ts
var import_samyWorkflow = __toESM(require_samyWorkflow(), 1);

// src/commands/workflow/generateImportRun.ts
var WorkflowGenerateImportRunOptionsSchema = z9.object({
  projectId: z9.string().min(1).optional(),
  workflowId: z9.string().min(1, "workflowId is required"),
  prompt: z9.string().min(1, "prompt is required"),
  workflowName: z9.string().min(1).optional(),
  assistantMode: z9.string().min(1).optional(),
  stylePreset: z9.string().min(1).optional(),
  generationStrategy: z9.string().min(1).optional(),
  priorQuestionRounds: z9.number().int().nonnegative().optional(),
  answersJson: z9.string().min(2).optional(),
  output: z9.string().min(1).optional()
});
var parseAnswersJson = (raw) => {
  if (!raw) return void 0;
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    throw new CliError({
      type: "validation_error",
      message: "answers-json must be a valid JSON object.",
      exitCode: EXIT_CODES.VALIDATION,
      cause: error
    });
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new CliError({
      type: "validation_error",
      message: "answers-json must be a JSON object.",
      exitCode: EXIT_CODES.VALIDATION
    });
  }
  const normalized = {};
  for (const [key, value] of Object.entries(parsed)) {
    normalized[key] = typeof value === "string" || typeof value === "boolean" || value === null ? value : String(value);
  }
  return normalized;
};
var persistPortableWorkflow2 = async (outputPath, portableWorkflow) => {
  const resolvedPath = resolve2(outputPath);
  await mkdir2(dirname5(resolvedPath), { recursive: true });
  await writeFile2(resolvedPath, `${JSON.stringify(portableWorkflow, null, 2)}
`, "utf8");
  return resolvedPath;
};
var workflowGenerateImportRunHandler = async (options, context) => {
  const projectId = resolveProjectIdOrThrow(options.projectId, context.runtimeConfig.currentProjectId);
  const answers = parseAnswersJson(options.answersJson);
  const generation = import_samyWorkflow.WorkflowAssistantGenerateResponseSchema.parse(
    await context.transport.generateWorkflow({
      projectId,
      workflowId: options.workflowId,
      prompt: options.prompt,
      answers,
      assistantMode: options.assistantMode,
      priorQuestionRounds: options.priorQuestionRounds,
      workflowName: options.workflowName,
      stylePreset: options.stylePreset,
      generationStrategy: options.generationStrategy
    })
  );
  if (generation.kind !== "workflow") {
    console.log(`[workflow.generate-import-run] ${context.transport.kind} generation requires clarification for ${projectId}/${options.workflowId}`);
    return {
      projectId,
      workflowId: options.workflowId,
      transport: context.transport.kind,
      imported: false,
      executed: false,
      response: generation
    };
  }
  const importResult = await context.transport.importWorkflow({
    projectId,
    workflowId: options.workflowId,
    payload: generation.portableWorkflow
  });
  let outputPath = null;
  if (options.output) {
    outputPath = await persistPortableWorkflow2(options.output, generation.portableWorkflow);
  }
  let runResult;
  const spinner = context.json ? null : context.output.createSpinner({ text: `Running workflow ${projectId}/${options.workflowId}...` });
  try {
    runResult = await context.transport.runWorkflow(
      {
        projectId,
        workflowId: options.workflowId
      },
      (event) => {
        if (!context.json && spinner) {
          const totalNodes = event.totalNodeCount || 0;
          if (event.step === "node_start") {
            const comp = event.completedNodeCount ?? 0;
            const displayTotal = totalNodes > 0 ? totalNodes : "?";
            spinner.update(`[${comp}/${displayTotal}] ${event.label}...`);
          }
        }
      }
    );
    if (!context.json && spinner) {
      spinner.stop(`Workflow run finished (${runResult.summary.artifactCount} artifact(s)).`);
    }
  } finally {
    if (spinner) {
      spinner.stop();
    }
  }
  console.log(`[workflow.generate-import-run] ${context.transport.kind} generation, import, and run completed for ${projectId}/${options.workflowId}`);
  if (outputPath) {
    console.log(`[workflow.generate-import-run] Portable workflow written to ${outputPath}`);
  }
  return {
    projectId,
    workflowId: options.workflowId,
    transport: context.transport.kind,
    imported: true,
    executed: true,
    outputPath,
    generation,
    import: importResult,
    run: runResult
  };
};
var registerWorkflowGenerateImportRunCommand = (workflowCommand, context) => {
  workflowCommand.command("generate-import-run").description("Generate a workflow, import it, then run it when supported by the transport").option("--project-id <projectId>", "Target project identifier").requiredOption("--workflow-id <workflowId>", "Target workflow identifier").requiredOption("--prompt <prompt>", "Prompt to send to Samy").option("--workflow-name <name>", "Optional workflow name override").option("--assistant-mode <mode>", "Assistant mode").option("--style-preset <preset>", "Style preset").option("--generation-strategy <strategy>", "Generation strategy").option("--prior-question-rounds <count>", "Number of prior clarification rounds", (value) => Number(value)).option("--answers-json <json>", "JSON object of Samy clarification answers").option("--output <path>", "Write the generated workflow JSON to a file before import").action(
    createCommandAction({
      context,
      commandName: "workflow.generate-import-run",
      schema: WorkflowGenerateImportRunOptionsSchema,
      handler: workflowGenerateImportRunHandler
    })
  );
};

// src/commands/workflow/generateAndImport.ts
import { mkdir as mkdir3, writeFile as writeFile3 } from "node:fs/promises";
import { dirname as dirname6, resolve as resolve3 } from "node:path";
import { z as z10 } from "zod";
var WorkflowGenerateAndImportOptionsSchema = z10.object({
  projectId: z10.string().min(1).optional(),
  workflowId: z10.string().min(1, "workflowId is required"),
  prompt: z10.string().min(1, "prompt is required"),
  workflowName: z10.string().min(1).optional(),
  assistantMode: z10.string().min(1).optional(),
  stylePreset: z10.string().min(1).optional(),
  generationStrategy: z10.string().min(1).optional(),
  priorQuestionRounds: z10.number().int().nonnegative().optional(),
  answersJson: z10.string().min(2).optional(),
  output: z10.string().min(1).optional()
});
var parseAnswersJson2 = (raw) => {
  if (!raw) return void 0;
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    throw new CliError({
      type: "validation_error",
      message: "answers-json must be a valid JSON object.",
      exitCode: EXIT_CODES.VALIDATION,
      cause: error
    });
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new CliError({
      type: "validation_error",
      message: "answers-json must be a JSON object.",
      exitCode: EXIT_CODES.VALIDATION
    });
  }
  const normalized = {};
  for (const [key, value] of Object.entries(parsed)) {
    normalized[key] = typeof value === "string" || typeof value === "boolean" || value === null ? value : String(value);
  }
  return normalized;
};
var persistPortableWorkflow3 = async (outputPath, portableWorkflow) => {
  const resolvedPath = resolve3(outputPath);
  await mkdir3(dirname6(resolvedPath), { recursive: true });
  await writeFile3(resolvedPath, `${JSON.stringify(portableWorkflow, null, 2)}
`, "utf8");
  return resolvedPath;
};
var workflowGenerateAndImportHandler = async (options, context) => {
  const projectId = resolveProjectIdOrThrow(options.projectId, context.runtimeConfig.currentProjectId);
  const answers = parseAnswersJson2(options.answersJson);
  const response = import_samyWorkflow.WorkflowAssistantGenerateResponseSchema.parse(
    await context.transport.generateWorkflow({
      projectId,
      workflowId: options.workflowId,
      prompt: options.prompt,
      answers,
      assistantMode: options.assistantMode,
      priorQuestionRounds: options.priorQuestionRounds,
      workflowName: options.workflowName,
      stylePreset: options.stylePreset,
      generationStrategy: options.generationStrategy
    })
  );
  if (response.kind !== "workflow") {
    console.log(`[workflow.generate-and-import] ${context.transport.kind} generation requires clarification for ${projectId}/${options.workflowId}`);
    return {
      projectId,
      workflowId: options.workflowId,
      transport: context.transport.kind,
      imported: false,
      response
    };
  }
  const importResult = await context.transport.importWorkflow({
    projectId,
    workflowId: options.workflowId,
    payload: response.portableWorkflow
  });
  let outputPath = null;
  if (options.output) {
    outputPath = await persistPortableWorkflow3(options.output, response.portableWorkflow);
  }
  console.log(`[workflow.generate-and-import] ${context.transport.kind} generation and import completed for ${projectId}/${options.workflowId}`);
  if (outputPath) {
    console.log(`[workflow.generate-and-import] Portable workflow written to ${outputPath}`);
  }
  return {
    projectId,
    workflowId: options.workflowId,
    transport: context.transport.kind,
    imported: true,
    outputPath,
    generation: response,
    import: importResult
  };
};
var registerWorkflowGenerateAndImportCommand = (workflowCommand, context) => {
  workflowCommand.command("generate-and-import").description("Generate a portable workflow through Samy and immediately import it").option("--project-id <projectId>", "Target project identifier").requiredOption("--workflow-id <workflowId>", "Target workflow identifier").requiredOption("--prompt <prompt>", "Prompt to send to Samy").option("--workflow-name <name>", "Optional workflow name override").option("--assistant-mode <mode>", "Assistant mode").option("--style-preset <preset>", "Style preset").option("--generation-strategy <strategy>", "Generation strategy").option("--prior-question-rounds <count>", "Number of prior clarification rounds", (value) => Number(value)).option("--answers-json <json>", "JSON object of Samy clarification answers").option("--output <path>", "Write the generated workflow JSON to a file before/after import").action(
    createCommandAction({
      context,
      commandName: "workflow.generate-and-import",
      schema: WorkflowGenerateAndImportOptionsSchema,
      handler: workflowGenerateAndImportHandler
    })
  );
};

// src/commands/workflow/import.ts
import { readFile } from "node:fs/promises";
import { resolve as resolve4 } from "node:path";
import { z as z11 } from "zod";
var WorkflowImportOptionsSchema = z11.object({
  projectId: z11.string().min(1).optional(),
  workflowId: z11.string().min(1).optional(),
  input: z11.string().min(1, "input is required"),
  append: z11.boolean().default(false),
  mode: z11.enum(["replace", "append"]).default("replace"),
  force: z11.boolean().default(false),
  name: z11.string().min(1).optional()
});
var loadPortableWorkflowFromFile = async (inputPath) => {
  const resolvedPath = resolve4(inputPath);
  let raw;
  try {
    raw = await readFile(resolvedPath, "utf8");
  } catch (error) {
    throw new CliError({
      type: "validation_error",
      message: `Unable to read input file: ${resolvedPath}`,
      exitCode: EXIT_CODES.VALIDATION,
      cause: error
    });
  }
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    throw new CliError({
      type: "validation_error",
      message: `Input file is not valid JSON: ${resolvedPath}`,
      exitCode: EXIT_CODES.VALIDATION,
      cause: error
    });
  }
  return {
    resolvedPath,
    portableWorkflow: import_portableWorkflow.PortableWorkflowExportSchema.parse(parsed)
  };
};
var calculateWorkflowBounds = (nodes) => {
  if (nodes.length === 0) return { minX: 0, maxX: 0, minY: 0, maxY: 0, centerX: 0, centerY: 0, width: 0, height: 0 };
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const node of nodes) {
    const x = node.position?.x ?? 0;
    const y = node.position?.y ?? 0;
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  const width = maxX - minX;
  const height = maxY - minY;
  return { minX, maxX, minY, maxY, centerX: (minX + maxX) / 2, centerY: (minY + maxY) / 2, width, height };
};
var calculateSmartAppendOffset = (existingBounds, importBounds) => {
  const gap = 150;
  const isWide = existingBounds.width > existingBounds.height;
  const isImportWide = importBounds.width > importBounds.height;
  if (isWide) {
    return { x: existingBounds.centerX + existingBounds.width / 2 + gap, y: existingBounds.centerY };
  }
  if (isImportWide) {
    return { x: existingBounds.centerX, y: existingBounds.centerY + existingBounds.height / 2 + gap };
  }
  return { x: existingBounds.centerX, y: existingBounds.centerY + existingBounds.height / 2 + gap };
};
var workflowImportHandler = async (options, context) => {
  const projectId = resolveProjectIdOrThrow(options.projectId, context.runtimeConfig.currentProjectId);
  const { resolvedPath, portableWorkflow } = await loadPortableWorkflowFromFile(options.input);
  const workflowName = options.name || portableWorkflow.workflow.name || "Imported Workflow";
  let targetWorkflowId = options.workflowId;
  let importMode = options.append ? "append" : options.mode;
  let createdNewWorkflow = false;
  let positionOffset;
  if (!targetWorkflowId && importMode !== "append") {
    targetWorkflowId = `imported-${Date.now()}`;
    importMode = "replace";
    createdNewWorkflow = true;
    if (!context.json) {
      context.output.writeHuman(`
\u{1F4E6} Workflow: ${workflowName}
`);
      context.output.writeHuman(`   Nodes: ${portableWorkflow.nodes.length} | Edges: ${portableWorkflow.edges.length}

`);
      context.output.writeHuman(`Creating new workflow "${workflowName}" (id: ${targetWorkflowId})...
`);
    }
  } else if (!targetWorkflowId && importMode === "append") {
    targetWorkflowId = "default";
    if (!context.json) {
      context.output.writeHuman(`
\u{1F4E6} Appending to workflow "default"...
`);
      context.output.writeHuman(`   Nodes to add: ${portableWorkflow.nodes.length} | Edges to add: ${portableWorkflow.edges.length}

`);
    }
  } else if (targetWorkflowId && importMode !== "append" && !options.force) {
    if (!context.json) {
      context.output.writeHuman(`
\u26A0\uFE0F  Workflow "${targetWorkflowId}" already exists in project ${projectId}.
`);
      context.output.writeHuman(`   Importing will REPLACE its current content.

`);
      context.output.writeHuman(`   \u{1F4A1} To create a NEW workflow instead, omit --workflow-id
`);
      context.output.writeHuman(`   \u{1F4A1} To APPEND nodes beside existing ones, use --mode append
`);
      context.output.writeHuman(`   \u{1F4A1} To force replace without warning, use --force

`);
    }
  } else if (targetWorkflowId && importMode === "append") {
    if (!context.json) {
      context.output.writeHuman(`
\u{1F4E6} Appending to workflow "${targetWorkflowId}"...
`);
      context.output.writeHuman(`   Nodes to add: ${portableWorkflow.nodes.length} | Edges to add: ${portableWorkflow.edges.length}

`);
    }
  }
  if (importMode === "append") {
    const importBounds = calculateWorkflowBounds(portableWorkflow.nodes);
    positionOffset = calculateSmartAppendOffset(
      { centerX: 0, centerY: 0, width: importBounds.width, height: importBounds.height },
      importBounds
    );
  }
  const result = await context.transport.importWorkflow({
    projectId,
    workflowId: targetWorkflowId,
    payload: {
      ...portableWorkflow,
      workflow: {
        ...portableWorkflow.workflow,
        name: workflowName
      }
    },
    importMode,
    positionOffset
  });
  if (!context.json) {
    context.output.writeHuman(`\u2705 Import completed: ${workflowName}
`);
    context.output.writeHuman(`   Project: ${projectId}
`);
    context.output.writeHuman(`   Workflow: ${targetWorkflowId}${createdNewWorkflow ? " (new)" : ""}
`);
    context.output.writeHuman(`   Mode: ${result.importMode}
`);
    context.output.writeHuman(`   Nodes: ${result.importedNodeCount} | Edges: ${result.importedEdgeCount}

`);
  }
  return {
    projectId,
    workflowId: targetWorkflowId,
    inputPath: resolvedPath,
    transport: context.transport.kind,
    createdNewWorkflow,
    ...result
  };
};
var registerWorkflowImportCommand = (workflowCommand, context) => {
  workflowCommand.command("import").description("Import a Beemm Vision portable workflow document").option("--project-id <projectId>", "Target project identifier").option("--workflow-id <workflowId>", "Target workflow identifier (omit to create new)").option("--name <name>", "Override the imported workflow name").option("--mode <mode>", "Import mode: replace or append", "replace").option("--append", "(Deprecated) Use --mode append instead").option("--force", "Skip confirmation when replacing an existing workflow").requiredOption("--input <path>", "Portable workflow JSON file").action(
    createCommandAction({
      context,
      commandName: "workflow.import",
      schema: WorkflowImportOptionsSchema,
      handler: workflowImportHandler
    })
  );
};

// src/commands/workflow/list.ts
import { z as z12 } from "zod";
var WorkflowListOptionsSchema = z12.object({
  projectId: z12.string().min(1).optional()
});
var workflowListHandler = async (options, context) => {
  const projectId = resolveProjectIdOrThrow(options.projectId, context.runtimeConfig.currentProjectId);
  const result = import_catalog.WorkflowListResultSchema.parse(
    await context.transport.listWorkflows({ projectId })
  );
  console.log(`[workflow.list] ${context.transport.kind} listed workflows for ${projectId}`);
  if (context.transport.kind === "callable" && result.workflowCount === 0) {
    console.log(`[workflow.list] No workflows were returned by the callable backend for ${projectId}. If you are targeting local emulators, verify this project and its workflows exist in emulator Firestore.`);
  }
  return {
    transport: context.transport.kind,
    ...result
  };
};
var registerWorkflowListCommand = (workflowCommand, context) => {
  workflowCommand.command("list").description("List workflows for a project").option("--project-id <projectId>", "Target project identifier").action(
    createCommandAction({
      context,
      commandName: "workflow.list",
      schema: WorkflowListOptionsSchema,
      handler: workflowListHandler
    })
  );
};

// src/commands/workflow/rename.ts
import { z as z13 } from "zod";
var WorkflowRenameOptionsSchema = z13.object({
  projectId: z13.string().min(1).optional(),
  workflowId: z13.string().min(1, "workflowId is required"),
  name: z13.string().min(1, "name is required")
});
var workflowRenameHandler = async (options, context) => {
  const projectId = resolveProjectIdOrThrow(options.projectId, context.runtimeConfig.currentProjectId);
  await context.transport.renameWorkflow({
    projectId,
    workflowId: options.workflowId,
    name: options.name
  });
  if (!context.json) {
    context.output.writeHuman(`\u2705 Workflow renamed: "${options.name}"
`);
    context.output.writeHuman(`   Project: ${projectId}
`);
    context.output.writeHuman(`   Workflow ID: ${options.workflowId}
`);
  }
  return {
    projectId,
    workflowId: options.workflowId,
    newName: options.name,
    transport: context.transport.kind
  };
};
var registerWorkflowRenameCommand = (workflowCommand, context) => {
  workflowCommand.command("rename").description("Rename an existing workflow").option("--project-id <projectId>", "Target project identifier").requiredOption("--workflow-id <workflowId>", "Target workflow identifier").requiredOption("--name <name>", "New name for the workflow").action(
    createCommandAction({
      context,
      commandName: "workflow.rename",
      schema: WorkflowRenameOptionsSchema,
      handler: workflowRenameHandler
    })
  );
};

// src/commands/workflow/run.ts
import * as readline from "readline";
import { z as z14 } from "zod";

// src/contracts/workflowRun.ts
var import_workflowRun = __toESM(require_workflowRun(), 1);

// src/contracts/mediaPricing.ts
var import_mediaPricing = __toESM(require_mediaPricing(), 1);

// src/contracts/modelFamilies.ts
var import_modelFamilies = __toESM(require_modelFamilies(), 1);

// src/core/pricing.ts
var AI_PRICING = {
  ...import_mediaPricing.MEDIA_PRICING,
  // --- ajoutés en BV-194 (paliers dans functions/src/shared/llmGrid.ts) ---
  "anthropic/claude-fable-5.1": { baseCost: 40 },
  "anthropic/claude-fable-5": { baseCost: 40 },
  "anthropic/claude-opus-5": { baseCost: 20 },
  "anthropic/claude-opus-4.8": { baseCost: 20 },
  "anthropic/claude-opus-4.7": { baseCost: 20 },
  "anthropic/claude-opus-4.6": { baseCost: 20 },
  "anthropic/claude-opus-4.5": { baseCost: 20 },
  "openai/gpt-6-astra": { baseCost: 40 },
  "openai/gpt-5.5": { baseCost: 20 },
  "openai/gpt-5.4": { baseCost: 8 },
  "openai/o3": { baseCost: 8 },
  "openai/gpt-5.2": { baseCost: 6 },
  "openai/gpt-5.1": { baseCost: 6 },
  "openai/gpt-4o-mini": { baseCost: 4 },
  "google/gemini-3.1-pro-preview": { baseCost: 8 },
  "google/gemini-3-flash-preview": { baseCost: 6 },
  "qwen/qwen3.7-flash": { baseCost: 3 },
  "z-ai/glm-5.3-flash": { baseCost: 4 },
  // 3 → 4 (BV-341) : tarif réel 0,15 $/Mtok
  "google/gemini-2.5-flash": { baseCost: 4 },
  "google/gemini-3.7-flash": { baseCost: 6 },
  "openai/gpt-5.6-luna": { baseCost: 4 },
  "qwen/qwen3.8-flash": { baseCost: 4 },
  "qwen/qwen3.8-27b": { baseCost: 4 },
  "openai/gpt-5-mini": { baseCost: 4 },
  "qwen/qwen3-vl-235b-a22b-instruct": { baseCost: 4 },
  "google/gemini-3.8-flash": { baseCost: 6 },
  "google/gemini-3.6-flash": { baseCost: 6 },
  "openai/gpt-5": { baseCost: 6 },
  "anthropic/claude-sonnet-5": { baseCost: 8 },
  "openai/gpt-4o": { baseCost: 8 },
  "anthropic/claude-sonnet-4.6": { baseCost: 8 },
  "anthropic/claude-sonnet-4.5": { baseCost: 8 },
  "google/gemini-2.5-flash-lite": { baseCost: 3 },
  "google/gemini-3.1-flash-lite": { baseCost: 4 },
  "google/gemini-3.5-flash-lite": { baseCost: 4 },
  "google/gemini-2.5-pro": { baseCost: 6 },
  "google/gemini-3.5-flash": { baseCost: 6 },
  "x-ai/grok-4.20": { baseCost: 6 },
  "qwen/qwen3.8-max-0902": { baseCost: 8 }
};
var calculateGenerationCost = (modelId, inputs = {}, ctx = {}) => {
  const prepared = (0, import_mediaPricing.preparePricingInputs)(inputs, ctx);
  const { adapterId } = (0, import_modelFamilies.resolveModelVariant)(modelId, prepared);
  const rule = AI_PRICING[adapterId] ?? AI_PRICING[modelId];
  if (!rule) return 1;
  if (rule.calculateCost) return rule.calculateCost(prepared);
  return rule.baseCost;
};

// src/commands/workflow/run.ts
var WorkflowRunOptionsSchema = z14.object({
  projectId: z14.string().min(1).optional(),
  workflowId: z14.string().min(1, "workflowId is required")
});
var formatCredits = (credits) => {
  return credits.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};
var statusIcon = (status) => {
  switch (status) {
    case "success":
      return "\u2713";
    case "running":
      return "\u27F3";
    case "failed":
      return "\u2717";
    case "skipped":
      return "\u2298";
    default:
      return " ";
  }
};
var promptConfirmation = async (question) => {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve6) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve6(answer.trim());
    });
  });
};
var estimateWorkflowCost = (workflow) => {
  let total = 0;
  for (const node of workflow.nodes) {
    if (node.bypass === true) continue;
    if (node.type === "imageModel") {
      const modelId = String(node.inputs?.modelId || "seedream");
      total += calculateGenerationCost(modelId, node.inputs || {});
    }
    if (node.type === "anyLlm" || node.type === "imageDescriber") {
      const modelId = String(node.inputs?.model || node.inputs?.modelId || "google/gemini-2.5-flash");
      total += calculateGenerationCost(modelId, node.inputs || {});
    }
    if (node.type === "promptEnhancer") {
      const modelId = String(node.inputs?.model || "google/gemini-2.5-flash");
      total += calculateGenerationCost(modelId, node.inputs || {});
    }
  }
  return (0, import_mediaPricing.roundCostUpToHundredth)(total);
};
var renderDashboard = (nodeStates, creditsInfo, workflowUrl, progress) => {
  const lines = [];
  lines.push("");
  lines.push(`\u256D\u2500${"\u2500".repeat(58)}\u2500\u256E`);
  lines.push(`\u2502  Credits: ${creditsInfo.padEnd(56)}\u2502`);
  lines.push(`\u2570\u2500${"\u2500".repeat(58)}\u2500\u256F`);
  lines.push("");
  lines.push(`\x1B[1mNode                    Status      Duration\x1B[0m`);
  lines.push("\u2500".repeat(45));
  for (const [, state] of nodeStates) {
    const icon = statusIcon(state.status);
    const status = state.status.toUpperCase().padEnd(11);
    const duration = state.duration || "-";
    const color = state.status === "running" ? "33m" : state.status === "success" ? "32m" : state.status === "failed" ? "31m" : "90m";
    lines.push(`[\x1B[${color}${icon}\x1B[0m] ${sanitizeForTerminal(state.label).padEnd(20)} ${status} ${duration}`);
  }
  lines.push("");
  lines.push(`Progress: ${progress.completed}/${progress.total} nodes complete | ${progress.running} running | ${progress.queued} queued`);
  lines.push("");
  const isTTY = process.stdout.isTTY;
  if (isTTY) {
    process.stdout.write("\x1B[H\x1B[2J");
  }
  process.stdout.write(lines.join("\n"));
};
var renderFinalResults = (execution, metadata) => {
  const { run } = execution;
  const textArtifacts = run.artifacts.filter((a) => a.kind === "text");
  const imageArtifacts = run.artifacts.filter((a) => a.kind === "image");
  const videoArtifacts = run.artifacts.filter((a) => a.kind === "video");
  const lines = [];
  lines.push("");
  lines.push("\u256D\u2500" + "\u2500".repeat(58) + "\u2500\u256E");
  lines.push("\u2502  \x1B[32mWorkflow Complete!\x1B[0m" + " ".repeat(41) + "\u2502");
  const remaining = typeof metadata.remainingCredits === "number" ? formatCredits(metadata.remainingCredits) : "unavailable";
  const creditLine = metadata.creditsUsed !== void 0 ? `Credits used: ${formatCredits(metadata.creditsUsed)} | Remaining: ${remaining}` : "";
  if (creditLine) {
    lines.push("\u2502  " + creditLine.padEnd(56) + "\u2502");
  }
  lines.push("\u2570\u2500" + "\u2500".repeat(58) + "\u2500\u256F");
  lines.push("");
  if (textArtifacts.length > 0) {
    lines.push("\x1B[1m\u{1F4DD} Text Outputs (" + textArtifacts.length + "):\x1B[0m");
    textArtifacts.forEach((a) => {
      const preview = a.text ? a.text.length > 120 ? a.text.substring(0, 120) + "..." : a.text : "(empty)";
      lines.push("  " + sanitizeForTerminal(a.label) + ' \u2192 "' + sanitizeForTerminal(preview) + '"');
    });
    lines.push("");
  }
  if (imageArtifacts.length > 0) {
    lines.push("\x1B[1m\u{1F5BC}\uFE0F  Image Outputs (" + imageArtifacts.length + "):\x1B[0m");
    imageArtifacts.forEach((a, i) => {
      lines.push("  " + (i + 1) + ". " + sanitizeForTerminal(a.url || "(no url)"));
    });
    lines.push("");
  }
  if (videoArtifacts.length > 0) {
    lines.push("\x1B[1m\u{1F3AC} Video Outputs (" + videoArtifacts.length + "):\x1B[0m");
    videoArtifacts.forEach((a, i) => {
      lines.push("  " + (i + 1) + ". " + sanitizeForTerminal(a.url || "(no url)"));
    });
    lines.push("");
  }
  if (run.warnings.length > 0) {
    lines.push("\x1B[33m\u26A0\uFE0F  Warnings (" + run.warnings.length + "):\x1B[0m");
    run.warnings.forEach((w) => {
      lines.push("  - " + sanitizeForTerminal(w));
    });
    lines.push("");
  }
  process.stdout.write(lines.join("\n"));
};
var workflowRunHandler = async (options, context) => {
  const projectId = resolveProjectIdOrThrow(options.projectId, context.runtimeConfig.currentProjectId);
  const appBaseUrl = context.runtimeConfig.appBaseUrl || "https://app.beemmvision.com";
  const workflowUrl = `${appBaseUrl}/#/project/${projectId}/workflow/${options.workflowId}`;
  const transport = context.transport;
  let credits = null;
  try {
    credits = await transport.getCredits();
  } catch (error) {
    if (!context.json) {
      context.output.writeHuman(
        `
\u26A0\uFE0F  Balance: unavailable (${error instanceof Error ? error.message : String(error)})
   The run continues; the backend remains the authority on what it charges.
`
      );
    }
  }
  if (!context.json) {
    context.output.writeHuman(`
\u{1F517} Open in browser: ${workflowUrl}
`);
    let estimatedCost = 0;
    try {
      const workflow = await transport.exportWorkflow({ projectId, workflowId: options.workflowId });
      estimatedCost = estimateWorkflowCost(workflow);
    } catch {
    }
    const balanceLine = credits === null ? "   Your balance: unavailable (see above)" : `   Your balance: ${formatCredits(credits)} credits`;
    if (estimatedCost > 0 && process.stdin.isTTY) {
      context.output.writeHuman(`
\u{1F4B0} Estimated cost: ${formatCredits(estimatedCost)} credits`);
      context.output.writeHuman(`${balanceLine}
`);
      const answer = await promptConfirmation("Continue? (y/n): ");
      if (answer.toLowerCase() !== "y") {
        context.output.writeHuman("\nCancelled.\n");
        process.exit(0);
      }
    } else if (estimatedCost > 0) {
      context.output.writeHuman(`
\u{1F4B0} Estimated cost: ${formatCredits(estimatedCost)} credits`);
      context.output.writeHuman(balanceLine);
      context.output.writeHuman(`   (Non-interactive mode: proceeding automatically)
`);
    }
    if (credits !== null && credits < 10) {
      context.output.writeHuman(`
\u26A0\uFE0F  Warning: Low credit balance (${formatCredits(credits)} credits).
`);
    }
    context.output.writeHuman("");
  }
  const nodeStates = /* @__PURE__ */ new Map();
  let creditsUsed = 0;
  let remainingCredits = credits;
  let totalNodeCount = 0;
  let execution;
  try {
    execution = import_workflowRun.WorkflowExecutionResultSchema.parse(
      await transport.runWorkflow(
        { projectId, workflowId: options.workflowId },
        (event) => {
          if (context.json) return;
          if (event.step === "node_start" && event.status === "running") {
            nodeStates.set(event.nodeId, {
              label: event.label,
              status: "running",
              startTime: Date.now()
            });
          } else if (event.step === "node_start" && event.status === "queued") {
            nodeStates.set(event.nodeId, {
              label: event.label,
              status: "queued",
              startTime: Date.now()
            });
          } else if (event.step === "node_complete" || event.step === "node_failed" || event.step === "node_skipped") {
            const state = nodeStates.get(event.nodeId);
            if (state) {
              state.status = event.status;
              state.duration = `${((Date.now() - state.startTime) / 1e3).toFixed(1)}s`;
            }
          } else if (event.step === "credits_used") {
            creditsUsed += event.amount || 0;
          }
          if (totalNodeCount === 0 && nodeStates.size > 0) {
            totalNodeCount = nodeStates.size;
          }
          const completed = [...nodeStates.values()].filter((s) => s.status === "success" || s.status === "failed" || s.status === "skipped").length;
          const running = [...nodeStates.values()].filter((s) => s.status === "running").length;
          const queued = Math.max(0, totalNodeCount - completed - running);
          const creditsInfo = credits === null ? `unavailable \u2192 unavailable (-${formatCredits(creditsUsed)} est.)` : `${formatCredits(credits)} \u2192 ${formatCredits(credits - creditsUsed)} (-${formatCredits(creditsUsed)} est.)`;
          renderDashboard(nodeStates, creditsInfo, workflowUrl, {
            completed,
            total: totalNodeCount,
            running,
            queued
          });
        }
      )
    );
    remainingCredits = execution.remainingCredits ?? (credits === null ? null : credits - creditsUsed);
    creditsUsed = execution.creditsUsed ?? creditsUsed;
    if (!context.json) {
      renderFinalResults(execution, {
        projectId,
        workflowId: options.workflowId,
        workflowUrl,
        creditsUsed,
        remainingCredits
      });
    }
  } catch (error) {
    if (!context.json) {
      context.output.writeStyled(
        `
\x1B[31m\u274C Workflow run failed: ${sanitizeForTerminal(error instanceof Error ? error.message : String(error))}\x1B[0m
`
      );
    }
    throw error;
  }
  console.log(`[workflow.run] ${context.transport.kind} run completed for ${projectId}/${options.workflowId}`);
  return {
    projectId,
    workflowId: options.workflowId,
    workflowUrl,
    transport: context.transport.kind,
    creditsUsed,
    remainingCredits,
    run: execution.run,
    progressEvents: execution.progressEvents,
    summary: execution.summary
  };
};
var registerWorkflowRunCommand = (workflowCommand, context) => {
  workflowCommand.command("run").description("Run a workflow and collect artifacts when supported by the transport").option("--project-id <projectId>", "Target project identifier").requiredOption("--workflow-id <workflowId>", "Target workflow identifier").action(
    createCommandAction({
      context,
      commandName: "workflow.run",
      schema: WorkflowRunOptionsSchema,
      handler: workflowRunHandler
    })
  );
};

// src/commands/workflow/samyGenerate.ts
import { mkdir as mkdir4, writeFile as writeFile4 } from "node:fs/promises";
import { dirname as dirname7, resolve as resolve5 } from "node:path";
import { z as z15 } from "zod";
var WorkflowSamyGenerateOptionsSchema = z15.object({
  projectId: z15.string().min(1).optional(),
  workflowId: z15.string().min(1, "workflowId is required"),
  prompt: z15.string().min(1, "prompt is required"),
  output: z15.string().min(1).optional(),
  workflowName: z15.string().min(1).optional(),
  assistantMode: import_samyWorkflow.WorkflowAssistantModeSchema.optional(),
  stylePreset: import_samyWorkflow.WorkflowAssistantStylePresetSchema.optional(),
  generationStrategy: import_samyWorkflow.WorkflowAssistantGenerationStrategySchema.optional(),
  priorQuestionRounds: z15.number().int().nonnegative().optional(),
  answersJson: z15.string().min(2).optional()
});
var parseAnswersJson3 = (raw) => {
  if (!raw) return void 0;
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    throw new CliError({
      type: "validation_error",
      message: "answers-json must be a valid JSON object.",
      exitCode: EXIT_CODES.VALIDATION,
      cause: error
    });
  }
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
    throw new CliError({
      type: "validation_error",
      message: "answers-json must be a JSON object.",
      exitCode: EXIT_CODES.VALIDATION
    });
  }
  const normalized = {};
  for (const [key, value] of Object.entries(parsed)) {
    if (typeof value === "string" || typeof value === "boolean" || value === null) {
      normalized[key] = value;
      continue;
    }
    normalized[key] = String(value);
  }
  return normalized;
};
var persistPortableWorkflow4 = async (outputPath, portableWorkflow) => {
  const resolvedPath = resolve5(outputPath);
  await mkdir4(dirname7(resolvedPath), { recursive: true });
  await writeFile4(resolvedPath, `${JSON.stringify(portableWorkflow, null, 2)}
`, "utf8");
  return resolvedPath;
};
var workflowSamyGenerateHandler = async (options, context) => {
  const projectId = resolveProjectIdOrThrow(options.projectId, context.runtimeConfig.currentProjectId);
  const answers = parseAnswersJson3(options.answersJson);
  const response = import_samyWorkflow.WorkflowAssistantGenerateResponseSchema.parse(
    await context.transport.generateWorkflow({
      projectId,
      workflowId: options.workflowId,
      prompt: options.prompt,
      answers,
      assistantMode: options.assistantMode,
      priorQuestionRounds: options.priorQuestionRounds,
      workflowName: options.workflowName,
      stylePreset: options.stylePreset,
      generationStrategy: options.generationStrategy
    })
  );
  let outputPath = null;
  if (options.output && response.kind === "workflow") {
    outputPath = await persistPortableWorkflow4(options.output, response.portableWorkflow);
  }
  console.log(
    `[workflow.samy-generate] ${context.transport.kind} generation completed for ${projectId}/${options.workflowId}`
  );
  if (outputPath) {
    console.log(`[workflow.samy-generate] Portable workflow written to ${outputPath}`);
  }
  return {
    projectId,
    workflowId: options.workflowId,
    prompt: options.prompt,
    transport: context.transport.kind,
    outputPath,
    response
  };
};
var registerWorkflowSamyGenerateCommand = (workflowCommand, context) => {
  workflowCommand.command("samy-generate").description("Generate a portable workflow through Samy").option("--project-id <projectId>", "Target project identifier").requiredOption("--workflow-id <workflowId>", "Target workflow identifier").requiredOption("--prompt <prompt>", "Prompt to send to Samy").option("--output <path>", "Write the generated workflow JSON to a file").option("--workflow-name <name>", "Optional workflow name override").option("--assistant-mode <mode>", "Assistant mode: eco, fast, premium, pro, deepseek-v3/v4-flash/v4-pro, qwen3-32b/72b, qwen25-72b, kimi-k3, glm-5.2, gemini-3.5-flash, gemini-3.6-flash, minimax-m3").option("--style-preset <preset>", "Style preset: default, editorial, graphic, cinematic").option("--generation-strategy <strategy>", "Generation strategy: standard or dashboard_bootstrap").option("--prior-question-rounds <count>", "Number of prior clarification rounds", (value) => Number(value)).option("--answers-json <json>", "JSON object of Samy clarification answers").action(
    createCommandAction({
      context,
      commandName: "workflow.samy-generate",
      schema: WorkflowSamyGenerateOptionsSchema,
      handler: workflowSamyGenerateHandler
    })
  );
};

// src/commands/workflow/watch.ts
import { z as z16 } from "zod";
var isDefinitiveWatchError = (error) => error instanceof CliError && !error.transient && (error.type === "auth_error" || error.type === "validation_error");
var WorkflowWatchOptionsSchema = z16.object({
  projectId: z16.string().min(1).optional(),
  workflowId: z16.string().min(1, "workflowId is required"),
  interval: z16.number().int().positive().max(60).optional()
});
var workflowWatchHandler = async (options, context) => {
  const projectId = resolveProjectIdOrThrow(options.projectId, context.runtimeConfig.currentProjectId);
  const pollInterval = options.interval || 5;
  const appBaseUrl = context.runtimeConfig.appBaseUrl || "https://app.beemmvision.com";
  const workflowUrl = `${appBaseUrl}/#/project/${projectId}/workflow/${options.workflowId}`;
  let previousSnapshot = null;
  let isRunning = true;
  const handleShutdown = () => {
    isRunning = false;
    if (!context.json) {
      context.output.writeHuman("\n\n\u{1F44B} Stopping workflow watch.\n");
    }
    process.exit(0);
  };
  process.on("SIGINT", handleShutdown);
  process.on("SIGTERM", handleShutdown);
  if (!context.json) {
    context.output.writeHuman(`
\u{1F441}\uFE0F  Watching workflow: ${options.workflowId}
`);
    context.output.writeHuman(`   Project: ${projectId}
`);
    context.output.writeHuman(`   URL: ${workflowUrl}
`);
    context.output.writeHuman(`   Poll interval: ${pollInterval}s
`);
    context.output.writeHuman(`   Press Ctrl+C to stop

`);
  }
  const pollWorkflow = async () => {
    const workflows = await context.transport.listWorkflows({ projectId });
    const workflow = workflows.workflows.find((w) => w.workflowId === options.workflowId);
    if (!workflow) {
      throw new CliError({
        type: "validation_error",
        message: `Workflow "${options.workflowId}" not found in project "${projectId}"`,
        exitCode: EXIT_CODES.VALIDATION
      });
    }
    const exportedWorkflow = await context.transport.exportWorkflow({ projectId, workflowId: options.workflowId });
    return {
      workflowId: workflow.workflowId,
      name: workflow.name,
      updatedAt: workflow.updatedAt,
      lastExecutedAt: workflow.lastExecutedAt,
      appConfigEnabled: workflow.appConfigEnabled,
      nodeCount: exportedWorkflow.nodes.length,
      edgeCount: exportedWorkflow.edges.length
    };
  };
  const formatChange = (prev, curr) => {
    const changes = [];
    if (prev.name !== curr.name) {
      changes.push(`  \u{1F4DD} Name: "${prev.name}" \u2192 "${curr.name}"`);
    }
    if (prev.nodeCount !== curr.nodeCount) {
      const diff = curr.nodeCount - prev.nodeCount;
      const sign = diff > 0 ? "+" : "";
      changes.push(`  \u{1F4E6} Nodes: ${prev.nodeCount} \u2192 ${curr.nodeCount} (${sign}${diff})`);
    }
    if (prev.edgeCount !== curr.edgeCount) {
      const diff = curr.edgeCount - prev.edgeCount;
      const sign = diff > 0 ? "+" : "";
      changes.push(`  \u{1F517} Edges: ${prev.edgeCount} \u2192 ${curr.edgeCount} (${sign}${diff})`);
    }
    if (prev.appConfigEnabled !== curr.appConfigEnabled) {
      changes.push(`  \u2699\uFE0F  App Config: ${prev.appConfigEnabled ? "ON" : "OFF"} \u2192 ${curr.appConfigEnabled ? "ON" : "OFF"}`);
    }
    if (prev.lastExecutedAt !== curr.lastExecutedAt && curr.lastExecutedAt) {
      changes.push(`  \u25B6\uFE0F  Last executed: ${new Date(curr.lastExecutedAt).toLocaleTimeString()}`);
    }
    if (prev.updatedAt !== curr.updatedAt) {
      changes.push(`  \u{1F550} Updated: ${new Date(curr.updatedAt || "").toLocaleTimeString()}`);
    }
    return changes;
  };
  const renderDashboard2 = (snapshot) => {
    const lines = [
      `\u256D\u2500 Workflow Watch \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256E`,
      `\u2502  Project: ${projectId.padEnd(50)}\u2502`,
      `\u2502  Workflow: ${snapshot.workflowId.padEnd(49)}\u2502`,
      `\u2502  Name: ${snapshot.name.padEnd(53)}\u2502`,
      `\u2502  Nodes: ${String(snapshot.nodeCount).padEnd(54)}\u2502`,
      `\u2502  Edges: ${String(snapshot.edgeCount).padEnd(54)}\u2502`,
      `\u2502  App Config: ${(snapshot.appConfigEnabled ? "ON" : "OFF").padEnd(49)}\u2502`,
      `\u2502  Last Executed: ${(snapshot.lastExecutedAt ? new Date(snapshot.lastExecutedAt).toLocaleTimeString() : "Never").padEnd(44)}\u2502`,
      `\u2570\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u256F`
    ];
    if (process.stdout.isTTY) {
      process.stdout.write("\x1B[2J\x1B[H");
    }
    lines.forEach((line) => context.output.writeHuman(line + "\n"));
  };
  try {
    while (isRunning) {
      try {
        const currentSnapshot = await pollWorkflow();
        if (context.json) {
          context.output.writeHuman(`${JSON.stringify({ ok: true, command: "workflow.watch", data: { snapshot: currentSnapshot }, logs: [] })}
`);
        } else {
          if (previousSnapshot) {
            const changes = formatChange(previousSnapshot, currentSnapshot);
            if (changes.length > 0) {
              context.output.writeHuman(`
\u{1F504} Changes detected:
`);
              changes.forEach((change) => context.output.writeHuman(`${change}
`));
            }
          }
          renderDashboard2(currentSnapshot);
        }
        previousSnapshot = currentSnapshot;
      } catch (error) {
        if (isDefinitiveWatchError(error)) {
          throw error;
        }
        context.output.writeHuman(
          `\u274C Error: ${error instanceof Error ? error.message : String(error)}
`,
          "stderr"
        );
      }
      await new Promise((resolve6) => setTimeout(resolve6, pollInterval * 1e3));
    }
  } finally {
    process.off("SIGINT", handleShutdown);
    process.off("SIGTERM", handleShutdown);
  }
  return {
    projectId,
    workflowId: options.workflowId,
    transport: context.transport.kind
  };
};
var registerWorkflowWatchCommand = (workflowCommand, context) => {
  workflowCommand.command("watch").description("Watch a workflow for changes and display real-time updates").option("--project-id <projectId>", "Target project identifier").requiredOption("--workflow-id <workflowId>", "Target workflow identifier").option("--interval <seconds>", "Poll interval in seconds (default: 5)", (value) => Number(value)).action(
    createCommandAction({
      context,
      commandName: "workflow.watch",
      schema: WorkflowWatchOptionsSchema,
      handler: workflowWatchHandler
    })
  );
};

// src/commands/workflow/index.ts
var registerWorkflowCommands = (program, context) => {
  const workflowCommand = program.command("workflow").description("Portable workflow operations for Beemm Vision");
  registerWorkflowExportCommand(workflowCommand, context);
  registerWorkflowImportCommand(workflowCommand, context);
  registerWorkflowDuplicateCommand(workflowCommand, context);
  registerWorkflowListCommand(workflowCommand, context);
  registerWorkflowRenameCommand(workflowCommand, context);
  registerWorkflowRunCommand(workflowCommand, context);
  registerWorkflowSamyGenerateCommand(workflowCommand, context);
  registerWorkflowGenerateAndImportCommand(workflowCommand, context);
  registerWorkflowGenerateImportRunCommand(workflowCommand, context);
  registerWorkflowWatchCommand(workflowCommand, context);
};

// src/commands/credits.ts
import { z as z17 } from "zod";
var CreditsOptionsSchema = z17.object({
  json: z17.boolean().default(false)
});
var creditsHandler = async (options, context) => {
  const credits = await context.transport.getCredits();
  if (context.json) {
    return { ok: true, command: "credits", data: { credits }, logs: [] };
  }
  context.output.writeHuman(`
\u{1F4B3} Credit Balance: ${credits} credits
`);
  if (credits < 50) {
    context.output.writeHuman(`\u26A0\uFE0F  Low credits! Consider adding more.
`);
  }
  return { ok: true, command: "credits", data: { credits }, logs: [] };
};
var registerCreditsCommand = (program, context) => {
  program.command("credits").description("Check your BeemmVision credit balance").option("--json", "Output results as JSON").action(
    createCommandAction({
      context,
      commandName: "credits",
      schema: CreditsOptionsSchema,
      handler: creditsHandler
    })
  );
};

// src/core/output.ts
import util from "node:util";
var normalizeChunk = (chunk) => {
  return chunk.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
};
var createOutputBuffer = () => {
  let value = "";
  return {
    get value() {
      return value;
    },
    write(chunk) {
      value += chunk;
    }
  };
};
var createOutputController = (options) => {
  const logs = [];
  let activeSpinner = null;
  const pushLog = (chunk) => {
    logs.push(...normalizeChunk(chunk));
  };
  const clearSpinner = () => {
    if (!activeSpinner || options.jsonMode || !process.stdout.isTTY) return;
    const sink = activeSpinner.stream === "stderr" ? writeStderr : writeStdout;
    sink("\r\x1B[2K");
  };
  const renderSpinner = () => {
    if (!activeSpinner || options.jsonMode) return;
    const sink = activeSpinner.stream === "stderr" ? writeStderr : writeStdout;
    const frame = activeSpinner.frames[activeSpinner.frameIndex % activeSpinner.frames.length];
    activeSpinner.frameIndex += 1;
    if (process.stdout.isTTY) {
      sink(`\r\x1B[2K${frame} ${activeSpinner.text}`);
    }
  };
  const stopSpinnerInternal = (finalText) => {
    if (!activeSpinner) return;
    if (activeSpinner.timer) {
      clearInterval(activeSpinner.timer);
    }
    const stream = activeSpinner.stream;
    clearSpinner();
    activeSpinner = null;
    if (finalText) {
      if (stream === "stderr") {
        writeStderr(`${finalText}
`);
      } else {
        writeStdout(`${finalText}
`);
      }
    }
  };
  const writeStdout = (chunk) => {
    options.stdoutBuffer.write(chunk);
    options.stdoutSink?.(chunk);
  };
  const writeStderr = (chunk) => {
    options.stderrBuffer.write(chunk);
    options.stderrSink?.(chunk);
  };
  const writeHuman = (chunk, stream = "stdout") => {
    if (options.jsonMode) {
      pushLog(chunk);
      return;
    }
    writeHumanToTerminal(sanitizeForTerminal(chunk), stream);
  };
  const writeHumanToTerminal = (chunk, stream) => {
    if (activeSpinner) {
      clearSpinner();
    }
    if (stream === "stderr") {
      writeStderr(chunk);
      if (activeSpinner) {
        renderSpinner();
      }
      return;
    }
    writeStdout(chunk);
    if (activeSpinner) {
      renderSpinner();
    }
  };
  const writeStyled = (chunk, stream = "stdout") => {
    if (options.jsonMode) {
      pushLog(chunk);
      return;
    }
    writeHumanToTerminal(chunk, stream);
  };
  return {
    jsonMode: options.jsonMode,
    logs,
    writeHuman,
    writeStyled,
    createSpinner({ text: rawText, stream = "stdout" }) {
      const text = sanitizeForTerminal(rawText);
      if (options.jsonMode) {
        return {
          update() {
            return void 0;
          },
          stop() {
            return void 0;
          }
        };
      }
      stopSpinnerInternal();
      const isTTY = Boolean(process.stdout.isTTY);
      activeSpinner = {
        frames: isTTY ? ["|", "/", "-", "\\"] : ["*"],
        frameIndex: 0,
        timer: null,
        text,
        stream
      };
      if (isTTY) {
        renderSpinner();
        activeSpinner.timer = setInterval(renderSpinner, 80);
      } else {
        renderSpinner();
      }
      return {
        update(rawNextText) {
          if (!activeSpinner) return;
          const nextText = sanitizeForTerminal(rawNextText);
          if (activeSpinner.text === nextText) return;
          activeSpinner.text = nextText;
          if (isTTY) {
            renderSpinner();
          } else {
            const sink = activeSpinner.stream === "stderr" ? writeStderr : writeStdout;
            sink(`[*] ${nextText}
`);
          }
        },
        stop(finalText) {
          stopSpinnerInternal(finalText === void 0 ? void 0 : sanitizeForTerminal(finalText));
        }
      };
    },
    writeJsonDocument(document) {
      stopSpinnerInternal();
      writeStdout(`${JSON.stringify(document, null, 2)}
`);
    },
    configureCommanderOutput() {
      return {
        writeOut: (str) => writeHuman(str, "stdout"),
        writeErr: (str) => writeHuman(str, "stderr")
      };
    },
    captureConsole() {
      const originalConsole = {
        log: console.log,
        info: console.info,
        warn: console.warn,
        error: console.error
      };
      const redirect = (stream) => (...args) => {
        const message = `${util.format(...args)}
`;
        writeHuman(message, stream);
      };
      console.log = redirect("stdout");
      console.info = redirect("stdout");
      console.warn = redirect("stderr");
      console.error = redirect("stderr");
      return () => {
        console.log = originalConsole.log;
        console.info = originalConsole.info;
        console.warn = originalConsole.warn;
        console.error = originalConsole.error;
      };
    }
  };
};

// src/core/runtimeDefaults.ts
var DEFAULT_FUNCTIONS_BASE_URL = "https://us-central1-beemm-vision.cloudfunctions.net";
var DEFAULT_APP_BASE_URL = "https://app.beemmvision.com";

// src/core/runtimeConfig.ts
var normalizeTransportMode = (value) => {
  if (value === "mock" || value === "callable") {
    return value;
  }
  return "auto";
};
var applyCliRoutingOptions = (base, cliOptions) => {
  const next = { ...base };
  if (cliOptions.transport) {
    next.transportMode = normalizeTransportMode(cliOptions.transport);
  }
  if (cliOptions.functionsBaseUrl) {
    next.functionsBaseUrl = cliOptions.functionsBaseUrl;
    next.functionsBaseUrlSource = "cli";
  }
  if (cliOptions.firebaseIdToken) {
    next.firebaseIdToken = cliOptions.firebaseIdToken;
    next.firebaseIdTokenSource = "cli";
  }
  return next;
};
var parseRuntimeConfig = async (cliOptions = {}, env = process.env) => {
  const storedConfig = loadVisionboardCliConfig(env);
  const transportMode = normalizeTransportMode(
    cliOptions.transport || readCliEnvVar(env, "CLI_TRANSPORT")
  );
  const cliFunctionsBaseUrl = cliOptions.functionsBaseUrl;
  const envFunctionsBaseUrl = readCliEnvVar(env, "FUNCTIONS_BASE_URL");
  const functionsBaseUrl = cliFunctionsBaseUrl || envFunctionsBaseUrl || storedConfig.functionsBaseUrl || DEFAULT_FUNCTIONS_BASE_URL;
  const functionsBaseUrlSource = cliFunctionsBaseUrl ? "cli" : envFunctionsBaseUrl ? "env" : storedConfig.functionsBaseUrl ? "config" : "default";
  const cliFirebaseIdToken = cliOptions.firebaseIdToken;
  const envFirebaseIdToken = readCliEnvVar(env, "FIREBASE_ID_TOKEN");
  const storedFirebaseIdToken = await getValidFirebaseIdToken(env);
  const envAppBaseUrl = readCliEnvVar(env, "APP_BASE_URL");
  const appBaseUrl = envAppBaseUrl || storedConfig.appBaseUrl || DEFAULT_APP_BASE_URL;
  const appBaseUrlSource = envAppBaseUrl ? "env" : storedConfig.appBaseUrl ? "config" : "default";
  const firebaseIdToken = cliFirebaseIdToken || envFirebaseIdToken || storedFirebaseIdToken || void 0;
  const firebaseIdTokenSource = cliFirebaseIdToken ? "cli" : envFirebaseIdToken ? "env" : storedFirebaseIdToken ? "stored" : "missing";
  return {
    transportMode,
    functionsBaseUrl,
    firebaseIdToken,
    firebaseIdTokenSource,
    currentProjectId: loadStoredProjectId(env),
    appBaseUrl,
    functionsBaseUrlSource,
    appBaseUrlSource,
    // Relu APRES `getValidFirebaseIdToken`, qui peut avoir reecrit le fichier
    // de session en rafraichissant le jeton d'identite.
    appCheck: readStoredAppCheckCredential(env)
  };
};

// src/core/appCheck.ts
var APP_CHECK_HEADER = "X-Firebase-AppCheck";
var APP_CHECK_RECOVERY_INSTRUCTION = "Relancez `beemmvision auth login` : la page qui s'ouvre r\xE9sout un vrai Turnstile dans votre navigateur et transmet l'attestation au CLI. Elle dure une heure, comme la session.";
var buildCallableHeaders = (firebaseIdToken, appCheck, accept = "application/json") => {
  const headers = {
    Accept: accept,
    "Content-Type": "application/json",
    Authorization: `Bearer ${firebaseIdToken}`
  };
  if (appCheck?.token) {
    headers[APP_CHECK_HEADER] = appCheck.token;
  }
  return headers;
};
var isAppCheckRejection = (reason, message) => {
  if (reason === "missing-token" || reason === "invalid-token") {
    return true;
  }
  return /app\s*check/i.test(message);
};
var describeAppCheckState = (appCheck) => {
  if (!appCheck?.token) {
    return "Aucun jeton App Check n'est stock\xE9 dans cette session CLI (session ouverte avant la prise en charge d'App Check, ou attestation indisponible au login).";
  }
  const expiryMs = appCheck.expiresAt ? Date.parse(appCheck.expiresAt) : Number.NaN;
  if (Number.isFinite(expiryMs) && expiryMs <= Date.now()) {
    return `Le jeton App Check de cette session a expir\xE9 le ${new Date(expiryMs).toISOString()}.`;
  }
  return "Le jeton App Check de cette session a \xE9t\xE9 transmis mais refus\xE9 par le backend (expir\xE9 ou invalide).";
};
var appCheckErrorMessage = (serverMessage, appCheck) => `${serverMessage} ${describeAppCheckState(appCheck)} ${APP_CHECK_RECOVERY_INSTRUCTION}`;
var isOpaqueCallableUnauthenticated = (code, message) => code === "UNAUTHENTICATED" && message.trim() === "Unauthenticated";
var readUnverifiedExpiryMs = (token) => {
  const parts = token.split(".");
  if (parts.length !== 3) {
    return void 0;
  }
  try {
    const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString("utf8"));
    const exp = payload?.exp;
    return typeof exp === "number" ? exp * 1e3 : void 0;
  } catch {
    return void 0;
  }
};
var identityState = (firebaseIdToken) => {
  if (!firebaseIdToken) {
    return { rank: "absent", clause: "aucun jeton d'identit\xE9 n'\xE9tait pr\xE9sent\xE9" };
  }
  const expiryMs = readUnverifiedExpiryMs(firebaseIdToken);
  if (expiryMs === void 0) {
    return {
      rank: "unknown",
      clause: "l'expiration du jeton d'identit\xE9 n'est pas lisible localement"
    };
  }
  if (expiryMs <= Date.now()) {
    return {
      rank: "expired",
      clause: `le jeton d'identit\xE9 a expir\xE9 le ${new Date(expiryMs).toISOString()}`
    };
  }
  return {
    rank: "valid",
    clause: `le jeton d'identit\xE9 est encore valide localement, jusqu'au ${new Date(expiryMs).toISOString()}`
  };
};
var attestationState = (appCheck) => {
  if (!appCheck?.token) {
    return {
      rank: "absent",
      clause: "aucun jeton App Check n'est stock\xE9 dans cette session (session ouverte avant la prise en charge d'App Check, ou attestation indisponible au login)"
    };
  }
  const expiryMs = appCheck.expiresAt ? Date.parse(appCheck.expiresAt) : Number.NaN;
  if (!Number.isFinite(expiryMs)) {
    return {
      rank: "unknown",
      clause: "un jeton App Check a \xE9t\xE9 transmis, mais son expiration n'est pas lisible localement"
    };
  }
  if (expiryMs <= Date.now()) {
    return {
      rank: "expired",
      clause: `le jeton App Check a expir\xE9 le ${new Date(expiryMs).toISOString()}`
    };
  }
  return {
    rank: "valid",
    clause: `un jeton App Check a \xE9t\xE9 transmis, valide localement jusqu'au ${new Date(expiryMs).toISOString()}`
  };
};
var OPAQUE_PREAMBLE = "Le backend a r\xE9pondu \xAB Unauthenticated \xBB, et rien d'autre. Sur une fonction `onCall` prot\xE9g\xE9e par App Check, le SDK Firebase \xE9met EXACTEMENT ce message pour deux causes qu'il ne distingue pas sur le fil : jeton d'identit\xE9 refus\xE9, ou attestation App Check absente, expir\xE9e ou refus\xE9e. Le serveur ne dit pas laquelle ; ce qui suit classe donc des hypoth\xE8ses \xE0 partir de l'\xE9tat LOCAL des jetons, et n'est pas un diagnostic.";
var SHARED_RECOVERY = `La m\xEAme action couvre les deux cas : ${APP_CHECK_RECOVERY_INSTRUCTION}`;
var opaqueCallableUnauthenticatedMessage = (appCheck, firebaseIdToken) => {
  const identity = identityState(firebaseIdToken);
  const attestation = attestationState(appCheck);
  const attestationSuspect = attestation.rank === "absent" || attestation.rank === "expired";
  if (attestationSuspect && identity.rank === "valid") {
    return `${OPAQUE_PREAMBLE} Hypoth\xE8se la plus probable, l'attestation App Check : ${attestation.clause}. Hypoth\xE8se de repli, la session Firebase \u2014 alors m\xEAme que ${identity.clause}. ${SHARED_RECOVERY}`;
  }
  if (identity.rank === "expired" || identity.rank === "absent") {
    return `${OPAQUE_PREAMBLE} Hypoth\xE8se la plus probable, la session Firebase : ${identity.clause}. Hypoth\xE8se de repli, l'attestation App Check \u2014 ${attestation.clause}. ${SHARED_RECOVERY}`;
  }
  return `${OPAQUE_PREAMBLE} Rien, c\xF4t\xE9 client, ne permet de d\xE9signer l'une plut\xF4t que l'autre : ${identity.clause}, et ${attestation.clause}. Le serveur en a refus\xE9 une sans dire laquelle. ${SHARED_RECOVERY}`;
};

// src/transports/callableWorkflowTransport.ts
var isCallableErrorResponse = (payload) => {
  return Boolean(payload) && typeof payload === "object" && Object.prototype.hasOwnProperty.call(payload, "error");
};
var createFunctionsUrl = (baseUrl, functionName) => {
  const trimmedBaseUrl = baseUrl.replace(/\/+$/, "");
  if (/cloudfunctions\.net$/i.test(trimmedBaseUrl)) {
    return `${trimmedBaseUrl}/${functionName}`;
  }
  return `${trimmedBaseUrl}/${functionName}`;
};
var mapFunctionsErrorToCliError = (status, payload, appCheck) => {
  const code = payload?.error?.code || "internal";
  const message = payload?.error?.message || `Functions transport failed with status ${status}.`;
  if (code === "unauthenticated" || code === "permission-denied") {
    return new CliError({
      type: "auth_error",
      message: isAppCheckRejection(payload?.error?.reason, message) ? appCheckErrorMessage(message, appCheck) : message,
      exitCode: EXIT_CODES.AUTH,
      cause: payload
    });
  }
  if (code === "invalid-argument") {
    return new CliError({
      type: "validation_error",
      message,
      exitCode: EXIT_CODES.VALIDATION,
      cause: payload
    });
  }
  return new CliError({
    type: "api_error",
    message,
    exitCode: EXIT_CODES.API,
    cause: payload
  });
};
var mapCallableErrorToCliError = (status, payload, appCheck, firebaseIdToken) => {
  const code = payload?.error?.status || "INTERNAL";
  const message = payload?.error?.message || `Callable transport failed with status ${status}.`;
  if (code === "UNAUTHENTICATED" || code === "PERMISSION_DENIED") {
    return new CliError({
      type: "auth_error",
      // Trois cas, dans cet ordre : le serveur a nommé App Check ; le serveur
      // a répondu le « Unauthenticated » indifférencié du SDK, qui ne nomme
      // rien ; le serveur a dit quelque chose d'explicite, qu'on laisse tel
      // quel.
      message: /app\s*check/i.test(message) ? appCheckErrorMessage(message, appCheck) : isOpaqueCallableUnauthenticated(code, message) ? opaqueCallableUnauthenticatedMessage(appCheck, firebaseIdToken) : message,
      exitCode: EXIT_CODES.AUTH,
      cause: payload
    });
  }
  if (code === "INVALID_ARGUMENT") {
    return new CliError({
      type: "validation_error",
      message,
      exitCode: EXIT_CODES.VALIDATION,
      cause: payload
    });
  }
  return new CliError({
    type: "api_error",
    message,
    exitCode: EXIT_CODES.API,
    cause: payload
  });
};
var CallableWorkflowTransport = class {
  constructor(baseUrl, firebaseIdToken, fetchImpl = fetch, appCheck = {}) {
    this.baseUrl = baseUrl;
    this.firebaseIdToken = firebaseIdToken;
    this.fetchImpl = fetchImpl;
    this.appCheck = appCheck;
  }
  baseUrl;
  firebaseIdToken;
  fetchImpl;
  appCheck;
  kind = "callable";
  /**
   * Les en-têtes de TOUS les appels sortants de ce transport.
   *
   * La logique elle-même vit dans `core/appCheck.ts`, partagée avec les appels
   * que le serveur MCP émet hors de ce transport : trois `fetch` bruts avaient
   * déjà divergé une fois, en n'attachant jamais l'attestation.
   */
  buildHeaders(accept = "application/json") {
    return buildCallableHeaders(this.firebaseIdToken, this.appCheck, accept);
  }
  mapFunctionsError(status, payload) {
    return mapFunctionsErrorToCliError(status, payload, this.appCheck);
  }
  async exportWorkflow(input) {
    let response;
    try {
      response = await this.fetchImpl(createFunctionsUrl(this.baseUrl, "exportPortableWorkflow"), {
        method: "POST",
        headers: this.buildHeaders(),
        body: JSON.stringify(input)
      });
    } catch (error) {
      throw new CliError({
        type: "auth_error",
        message: `Callable transport requires a reachable Functions backend and a valid Firebase ID token. Network error: ${error instanceof Error ? error.message : String(error)}`,
        exitCode: EXIT_CODES.AUTH,
        transient: true,
        cause: error
      });
    }
    let payload = null;
    try {
      payload = await response.json();
    } catch {
      payload = null;
    }
    if (!response.ok || !payload?.ok) {
      throw this.mapFunctionsError(response.status, payload);
    }
    return import_portableWorkflow.PortableWorkflowExportSchema.parse(payload.portableWorkflow);
  }
  async importWorkflow(input) {
    let response;
    try {
      response = await this.fetchImpl(createFunctionsUrl(this.baseUrl, "importPortableWorkflow"), {
        method: "POST",
        headers: this.buildHeaders(),
        body: JSON.stringify(input)
      });
    } catch (error) {
      throw new CliError({
        type: "auth_error",
        message: `Callable transport requires a reachable Functions backend and a valid Firebase ID token. Network error: ${error instanceof Error ? error.message : String(error)}`,
        exitCode: EXIT_CODES.AUTH,
        transient: true,
        cause: error
      });
    }
    let payload = null;
    try {
      payload = await response.json();
    } catch {
      payload = null;
    }
    if (!response.ok || !payload?.ok) {
      throw this.mapFunctionsError(response.status, payload);
    }
    return import_portableWorkflow.WorkflowImportResultSchema.parse({
      importMode: payload.importMode,
      workflowName: payload.workflowName,
      importedNodeCount: payload.importedNodeCount,
      importedEdgeCount: payload.importedEdgeCount
    });
  }
  async generateWorkflow(input) {
    let response;
    try {
      response = await this.fetchImpl(createFunctionsUrl(this.baseUrl, "generateWorkflowWithSamy"), {
        method: "POST",
        headers: this.buildHeaders(),
        body: JSON.stringify({ data: input })
      });
    } catch (error) {
      throw new CliError({
        type: "auth_error",
        message: `Callable transport requires a reachable Functions backend and a valid Firebase ID token. Network error: ${error instanceof Error ? error.message : String(error)}`,
        exitCode: EXIT_CODES.AUTH,
        transient: true,
        cause: error
      });
    }
    let payload = null;
    try {
      payload = await response.json();
    } catch {
      payload = null;
    }
    if (!response.ok || !payload || isCallableErrorResponse(payload)) {
      throw mapCallableErrorToCliError(
        response.status,
        payload,
        this.appCheck,
        this.firebaseIdToken
      );
    }
    return import_samyWorkflow.WorkflowAssistantGenerateResponseSchema.parse(payload.result);
  }
  async runWorkflow(input, onProgress) {
    if (onProgress) {
      const response2 = await this.fetchImpl(createFunctionsUrl(this.baseUrl, "executeWorkflowPortable"), {
        method: "POST",
        headers: this.buildHeaders("application/x-ndjson"),
        body: JSON.stringify({ ...input, stream: true, executionId: `cli-${Date.now()}-${Math.random().toString(36).slice(2, 8)}` })
      });
      if (!response2.ok) {
        throw new CliError({
          type: "api_error",
          message: `Stream request failed with status ${response2.status}`,
          exitCode: EXIT_CODES.API
        });
      }
      if (!response2.body) {
        throw new CliError({
          type: "api_error",
          message: "Response body is empty",
          exitCode: EXIT_CODES.API
        });
      }
      const reader = response2.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";
        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const data = JSON.parse(line);
            if (data.type === "progress") {
              onProgress(data.event);
            } else if (data.type === "result") {
              return import_workflowRun.WorkflowExecutionResultSchema.parse(data.data);
            } else if (data.type === "error") {
              throw new CliError({
                type: "api_error",
                message: data.error || "Unknown error during execution stream",
                exitCode: EXIT_CODES.API
              });
            }
          } catch (e) {
            if (e instanceof CliError) throw e;
          }
        }
      }
      throw new CliError({
        type: "api_error",
        message: "Stream ended without a final result",
        exitCode: EXIT_CODES.API
      });
    }
    let response;
    try {
      response = await this.fetchImpl(createFunctionsUrl(this.baseUrl, "executeWorkflowPortable"), {
        method: "POST",
        headers: this.buildHeaders(),
        body: JSON.stringify(input)
      });
    } catch (error) {
      throw new CliError({
        type: "auth_error",
        message: `Callable transport requires a reachable Functions backend and a valid Firebase ID token. Network error: ${error instanceof Error ? error.message : String(error)}`,
        exitCode: EXIT_CODES.AUTH,
        transient: true,
        cause: error
      });
    }
    let payload = null;
    try {
      payload = await response.json();
    } catch {
      payload = null;
    }
    if (!response.ok || !payload || !("ok" in payload) || !payload.ok) {
      throw this.mapFunctionsError(response.status, payload);
    }
    return import_workflowRun.WorkflowExecutionResultSchema.parse({
      run: payload.run,
      progressEvents: payload.progressEvents,
      summary: payload.summary
    });
  }
  async listWorkflows(input) {
    let response;
    try {
      response = await this.fetchImpl(createFunctionsUrl(this.baseUrl, "listProjectWorkflows"), {
        method: "POST",
        headers: this.buildHeaders(),
        body: JSON.stringify(input)
      });
    } catch (error) {
      throw new CliError({
        type: "auth_error",
        message: `Callable transport requires a reachable Functions backend and a valid Firebase ID token. Network error: ${error instanceof Error ? error.message : String(error)}`,
        exitCode: EXIT_CODES.AUTH,
        transient: true,
        cause: error
      });
    }
    let payload = null;
    try {
      payload = await response.json();
    } catch {
      payload = null;
    }
    if (!response.ok || !payload || !("ok" in payload) || !payload.ok) {
      throw this.mapFunctionsError(response.status, payload);
    }
    return import_catalog.WorkflowListResultSchema.parse(payload);
  }
  async listTemplates() {
    let response;
    try {
      response = await this.fetchImpl(createFunctionsUrl(this.baseUrl, "listCommunityTemplates"), {
        method: "POST",
        headers: this.buildHeaders(),
        body: JSON.stringify({})
      });
    } catch (error) {
      throw new CliError({
        type: "auth_error",
        message: `Callable transport requires a reachable Functions backend and a valid Firebase ID token. Network error: ${error instanceof Error ? error.message : String(error)}`,
        exitCode: EXIT_CODES.AUTH,
        transient: true,
        cause: error
      });
    }
    let payload = null;
    try {
      payload = await response.json();
    } catch {
      payload = null;
    }
    if (!response.ok || !payload || !("ok" in payload) || !payload.ok) {
      throw this.mapFunctionsError(response.status, payload);
    }
    return import_catalog.TemplateListResultSchema.parse(payload);
  }
  async getTemplate(input) {
    let response;
    try {
      response = await this.fetchImpl(createFunctionsUrl(this.baseUrl, "getCommunityTemplate"), {
        method: "POST",
        headers: this.buildHeaders(),
        body: JSON.stringify(input)
      });
    } catch (error) {
      throw new CliError({
        type: "auth_error",
        message: `Callable transport requires a reachable Functions backend and a valid Firebase ID token. Network error: ${error instanceof Error ? error.message : String(error)}`,
        exitCode: EXIT_CODES.AUTH,
        transient: true,
        cause: error
      });
    }
    let payload = null;
    try {
      payload = await response.json();
    } catch {
      payload = null;
    }
    if (!response.ok || !payload || !("ok" in payload) || !payload.ok) {
      throw this.mapFunctionsError(response.status, payload);
    }
    return import_catalog.TemplateGetResultSchema.parse(payload);
  }
  async duplicateTemplate(input) {
    let response;
    try {
      response = await this.fetchImpl(createFunctionsUrl(this.baseUrl, "duplicateCommunityTemplate"), {
        method: "POST",
        headers: this.buildHeaders(),
        body: JSON.stringify(input)
      });
    } catch (error) {
      throw new CliError({
        type: "auth_error",
        message: `Callable transport requires a reachable Functions backend and a valid Firebase ID token. Network error: ${error instanceof Error ? error.message : String(error)}`,
        exitCode: EXIT_CODES.AUTH,
        transient: true,
        cause: error
      });
    }
    let payload = null;
    try {
      payload = await response.json();
    } catch {
      payload = null;
    }
    if (!response.ok || !payload || !("ok" in payload) || !payload.ok) {
      throw this.mapFunctionsError(response.status, payload);
    }
    return import_catalog.TemplateDuplicateResultSchema.parse(payload);
  }
  async listProjects(input) {
    let response;
    try {
      response = await this.fetchImpl(createFunctionsUrl(this.baseUrl, "listUserProjects"), {
        method: "POST",
        headers: this.buildHeaders(),
        body: JSON.stringify(input)
      });
    } catch (error) {
      throw new CliError({
        type: "auth_error",
        message: `Callable transport requires a reachable Functions backend and a valid Firebase ID token. Network error: ${error instanceof Error ? error.message : String(error)}`,
        exitCode: EXIT_CODES.AUTH,
        transient: true,
        cause: error
      });
    }
    let payload = null;
    try {
      payload = await response.json();
    } catch {
      payload = null;
    }
    if (!response.ok || !payload || !("ok" in payload) || !payload.ok) {
      throw this.mapFunctionsError(response.status, payload);
    }
    return import_catalog.ProjectListResultSchema.parse(payload);
  }
  async getCredits() {
    let response;
    try {
      response = await this.fetchImpl(createFunctionsUrl(this.baseUrl, "getUserCredits"), {
        method: "POST",
        headers: this.buildHeaders(),
        body: JSON.stringify({})
      });
    } catch (error) {
      throw new CliError({
        type: "auth_error",
        message: `Callable transport requires a reachable Functions backend and a valid Firebase ID token. Network error: ${error instanceof Error ? error.message : String(error)}`,
        exitCode: EXIT_CODES.AUTH,
        transient: true,
        cause: error
      });
    }
    let payload = null;
    try {
      payload = JSON.parse(await response.text());
    } catch {
      payload = null;
    }
    if (!response.ok) {
      throw this.mapFunctionsError(
        response.status,
        payload ? { ok: false, error: payload.error } : null
      );
    }
    if (!payload || payload.ok !== true || typeof payload.credits !== "number" || !Number.isFinite(payload.credits)) {
      throw new CliError({
        type: "api_error",
        message: payload?.error?.message || `Le solde n\u2019a pas pu \xEAtre lu : la r\xE9ponse de getUserCredits n\u2019est pas un solde (statut ${response.status}). Aucun chiffre n\u2019est renvoy\xE9 plut\xF4t qu\u2019un solde invent\xE9.`,
        exitCode: EXIT_CODES.API,
        cause: payload
      });
    }
    return payload.credits;
  }
  async renameWorkflow(input) {
    let response;
    try {
      response = await this.fetchImpl(createFunctionsUrl(this.baseUrl, "renameWorkflow"), {
        method: "POST",
        headers: this.buildHeaders(),
        body: JSON.stringify(input)
      });
    } catch (error) {
      throw new CliError({
        type: "auth_error",
        message: `Callable transport requires a reachable Functions backend and a valid Firebase ID token. Network error: ${error instanceof Error ? error.message : String(error)}`,
        exitCode: EXIT_CODES.AUTH,
        transient: true,
        cause: error
      });
    }
    let payload = null;
    try {
      payload = await response.json();
    } catch {
      payload = null;
    }
    if (!response.ok || !payload?.ok) {
      throw new CliError({
        type: "api_error",
        message: payload?.error?.message || `Failed to rename workflow: ${response.statusText}`,
        exitCode: EXIT_CODES.API,
        cause: payload
      });
    }
    return { ok: true };
  }
  async createProject(input) {
    let response;
    try {
      response = await this.fetchImpl(createFunctionsUrl(this.baseUrl, "createProject"), {
        method: "POST",
        headers: this.buildHeaders(),
        body: JSON.stringify(input)
      });
    } catch (error) {
      throw new CliError({
        type: "auth_error",
        message: `Callable transport requires a reachable Functions backend and a valid Firebase ID token. Network error: ${error instanceof Error ? error.message : String(error)}`,
        exitCode: EXIT_CODES.AUTH,
        transient: true,
        cause: error
      });
    }
    let payload = null;
    try {
      payload = await response.json();
    } catch {
      payload = null;
    }
    if (!response.ok || !payload?.ok || !payload?.projectId) {
      throw new CliError({
        type: "api_error",
        message: payload?.error?.message || `Failed to create project: ${response.statusText}`,
        exitCode: EXIT_CODES.API,
        cause: payload
      });
    }
    return { projectId: payload.projectId, name: payload.name || input.name };
  }
};

// src/transports/mockWorkflowTransport.ts
var MockWorkflowTransport = class {
  kind = "mock";
  async exportWorkflow(input) {
    const portableWorkflow = (0, import_portableWorkflow.createMockPortableWorkflowExport)({
      projectId: input.projectId,
      workflowId: input.workflowId
    });
    return import_portableWorkflow.PortableWorkflowExportSchema.parse(portableWorkflow);
  }
  async importWorkflow(input) {
    return import_portableWorkflow.WorkflowImportResultSchema.parse({
      importMode: input.importMode || "replace",
      workflowName: input.payload.workflow.name,
      importedNodeCount: input.payload.nodes.length,
      importedEdgeCount: input.payload.edges.length
    });
  }
  async generateWorkflow(input) {
    const portableWorkflow = (0, import_portableWorkflow.createMockPortableWorkflowExport)({
      projectId: input.projectId,
      workflowId: input.workflowId
    });
    return import_samyWorkflow.WorkflowAssistantGenerateResponseSchema.parse({
      kind: "workflow",
      workflowName: input.workflowName || "Mock Samy Workflow",
      portableWorkflow: {
        ...portableWorkflow,
        workflow: {
          ...portableWorkflow.workflow,
          name: input.workflowName || "Mock Samy Workflow"
        }
      },
      warnings: [],
      reasoningSummary: `Mock Samy generation created from prompt: ${input.prompt}`,
      totalCost: 0,
      trace: ["Mock Samy transport used."]
    });
  }
  async runWorkflow(input, onProgress) {
    const progressEvents = [
      {
        nodeId: "node_prompt_enhancer_starter",
        nodeType: "promptEnhancer",
        label: "Prompt Enhancer",
        step: "node_start",
        status: "queued",
        message: "Node queued for execution.",
        timestamp: "2026-04-05T10:00:00.000Z"
      },
      {
        nodeId: "node_prompt_enhancer_starter",
        nodeType: "promptEnhancer",
        label: "Prompt Enhancer",
        step: "node_start",
        status: "running",
        message: "Node execution started.",
        timestamp: "2026-04-05T10:00:01.000Z"
      },
      {
        nodeId: "node_prompt_enhancer_starter",
        nodeType: "promptEnhancer",
        label: "Prompt Enhancer",
        step: "node_complete",
        status: "success",
        message: "Prompt enhanced with google/gemini-2.5-flash.",
        completedNodeCount: 1,
        totalNodeCount: 4,
        timestamp: "2026-04-05T10:00:02.000Z"
      },
      {
        nodeId: "node_image_model_starter",
        nodeType: "imageModel",
        label: "Nano Banana 2",
        step: "node_start",
        status: "queued",
        message: "Node queued for execution.",
        timestamp: "2026-04-05T10:00:03.000Z"
      },
      {
        nodeId: "node_image_model_starter",
        nodeType: "imageModel",
        label: "Nano Banana 2",
        step: "node_start",
        status: "running",
        message: "Node execution started.",
        timestamp: "2026-04-05T10:00:04.000Z"
      },
      {
        nodeId: "node_image_model_starter",
        nodeType: "imageModel",
        label: "Nano Banana 2",
        step: "node_complete",
        status: "success",
        message: "Image generated with nano-banana-2.",
        completedNodeCount: 2,
        totalNodeCount: 4,
        timestamp: "2026-04-05T10:00:05.000Z"
      }
    ];
    for (const event of progressEvents) {
      onProgress?.(event);
      await new Promise((r) => setTimeout(r, 150));
    }
    return import_workflowRun.WorkflowExecutionResultSchema.parse({
      run: {
        runId: `mock-run-${input.projectId}-${input.workflowId}`,
        workflowName: "Mock Samy Workflow",
        artifactCount: 2,
        executedNodeCount: 4,
        warnings: [],
        artifacts: [
          {
            nodeId: "node_prompt_enhancer_starter",
            nodeType: "promptEnhancer",
            label: "Prompt Enhancer",
            kind: "text",
            text: "A premium editorial product shot, clean composition, luxury lighting.",
            modelId: "google/gemini-2.5-flash",
            prompt: "Enhance the prompt"
          },
          {
            nodeId: "node_image_model_starter",
            nodeType: "imageModel",
            label: "Nano Banana 2",
            kind: "image",
            url: "https://example.com/mock-generated-image.png",
            mimeType: "image/png",
            modelId: "nano-banana-2",
            prompt: "A premium editorial product shot, clean composition, luxury lighting.",
            data: {
              outputFormat: "png",
              resolution: "1K"
            }
          }
        ]
      },
      progressEvents,
      summary: {
        executedNodeCount: 4,
        artifactCount: 2,
        warningCount: 0
      }
    });
  }
  async listWorkflows(input) {
    return import_catalog.WorkflowListResultSchema.parse({
      projectId: input.projectId,
      workflowCount: 2,
      workflows: [
        {
          workflowId: "default",
          name: "Main Workflow",
          updatedAt: "2026-04-04T10:00:00.000Z",
          lastExecutedAt: "2026-04-04T09:45:00.000Z",
          appConfigEnabled: true
        },
        {
          workflowId: "editorial-variant",
          name: "Editorial Variant",
          updatedAt: "2026-04-03T18:30:00.000Z",
          lastExecutedAt: null,
          appConfigEnabled: false
        }
      ]
    });
  }
  async listTemplates() {
    return import_catalog.TemplateListResultSchema.parse({
      templateCount: 2,
      templates: [
        {
          templateId: "template-editorial-premium",
          title: "Premium Editorial Template",
          description: "Editorial pipeline with prompt enhancer and image model.",
          thumbnailUrl: "https://example.com/template-editorial-premium.png",
          creatorName: "BEEMM Team",
          creatorPhotoUrl: null,
          status: "approved",
          includesGeneratedData: false,
          createdAt: "2026-04-01T09:00:00.000Z",
          updatedAt: "2026-04-02T12:00:00.000Z"
        },
        {
          templateId: "template-product-campaign",
          title: "Product Campaign Template",
          description: "Product visual generation flow for campaign variants.",
          thumbnailUrl: "https://example.com/template-product-campaign.png",
          creatorName: "BEEMM Team",
          creatorPhotoUrl: null,
          status: "approved",
          includesGeneratedData: false,
          createdAt: "2026-03-29T14:00:00.000Z",
          updatedAt: "2026-04-01T11:00:00.000Z"
        }
      ]
    });
  }
  async getTemplate(input) {
    const portableWorkflow = (0, import_portableWorkflow.createMockPortableWorkflowExport)({
      projectId: "template-catalog",
      workflowId: input.templateId
    });
    return import_catalog.TemplateGetResultSchema.parse({
      template: {
        templateId: input.templateId,
        title: "Premium Editorial Template",
        description: "Editorial pipeline with prompt enhancer and image model.",
        thumbnailUrl: "https://example.com/template-editorial-premium.png",
        creatorName: "BEEMM Team",
        creatorPhotoUrl: null,
        status: "approved",
        includesGeneratedData: false,
        createdAt: "2026-04-01T09:00:00.000Z",
        updatedAt: "2026-04-02T12:00:00.000Z"
      },
      portableWorkflow: {
        ...portableWorkflow,
        workflow: {
          ...portableWorkflow.workflow,
          name: "Premium Editorial Template"
        }
      }
    });
  }
  async duplicateTemplate(input) {
    return import_catalog.TemplateDuplicateResultSchema.parse({
      templateId: input.templateId,
      projectId: "mock-duplicated-project",
      workflowId: "default",
      projectName: "Copy of Premium Editorial Template",
      workflowName: "Main Workflow"
    });
  }
  async listProjects(input) {
    const allProjects = [
      {
        projectId: "mock-workflow-project",
        name: "Premium Editorial Project",
        type: "workflow",
        ownerId: "mock-user",
        ownerName: "Mock User",
        updatedAt: "2026-04-05T10:00:00.000Z",
        lastOpenedAt: "2026-04-05T09:45:00.000Z"
      },
      {
        projectId: "mock-board-project",
        name: "Campaign Board",
        type: "board",
        ownerId: "mock-user",
        ownerName: "Mock User",
        updatedAt: "2026-04-04T18:00:00.000Z",
        lastOpenedAt: "2026-04-04T17:30:00.000Z"
      }
    ];
    const filteredProjects = input.type ? allProjects.filter((project) => project.type === input.type) : allProjects;
    return import_catalog.ProjectListResultSchema.parse({
      projectCount: filteredProjects.length,
      projects: filteredProjects
    });
  }
  async getCredits() {
    return 1e3;
  }
  async renameWorkflow(input) {
    return { ok: true };
  }
  async createProject(input) {
    const projectId = `mock-project-${Date.now()}`;
    return { projectId, name: input.name };
  }
};

// src/transports/resolveWorkflowTransport.ts
var describeTransportTarget = (runtimeConfig) => {
  if (runtimeConfig.transportMode === "mock") {
    return "mock";
  }
  if (runtimeConfig.functionsBaseUrl && runtimeConfig.firebaseIdToken) {
    return "callable";
  }
  return "not_configured";
};
var toAppCheckCredential = (runtimeConfig) => ({
  token: runtimeConfig.appCheck?.token,
  expiresAt: runtimeConfig.appCheck?.expiresAt
});
var resolveWorkflowTransport = (runtimeConfig) => {
  if (runtimeConfig.transportMode === "mock") {
    return new MockWorkflowTransport();
  }
  const hasCallableConfig = Boolean(runtimeConfig.functionsBaseUrl && runtimeConfig.firebaseIdToken);
  if (runtimeConfig.transportMode === "callable") {
    if (!runtimeConfig.functionsBaseUrl) {
      throw new CliError({
        type: "validation_error",
        message: "Callable transport requires --functions-base-url or BEEMMVISION_FUNCTIONS_BASE_URL.",
        exitCode: EXIT_CODES.VALIDATION
      });
    }
    if (!runtimeConfig.firebaseIdToken) {
      throw new CliError({
        type: "auth_error",
        message: "Callable transport requires --firebase-id-token or BEEMMVISION_FIREBASE_ID_TOKEN.",
        exitCode: EXIT_CODES.AUTH
      });
    }
    return new CallableWorkflowTransport(
      runtimeConfig.functionsBaseUrl,
      runtimeConfig.firebaseIdToken,
      fetch,
      toAppCheckCredential(runtimeConfig)
    );
  }
  if (hasCallableConfig) {
    return new CallableWorkflowTransport(
      runtimeConfig.functionsBaseUrl,
      runtimeConfig.firebaseIdToken,
      fetch,
      toAppCheckCredential(runtimeConfig)
    );
  }
  if (!runtimeConfig.functionsBaseUrl) {
    throw new CliError({
      type: "validation_error",
      message: "Missing functions base URL. Please ensure your configuration is correct.",
      exitCode: EXIT_CODES.VALIDATION
    });
  }
  throw new CliError({
    type: "auth_error",
    message: "You must be logged in to use this command. Please run `auth login` or set BEEMMVISION_FIREBASE_ID_TOKEN.",
    exitCode: EXIT_CODES.AUTH
  });
};

// src/transports/lazyWorkflowTransport.ts
var createLazyWorkflowTransport = (options) => {
  let resolved = null;
  const ensure = () => {
    if (!resolved) {
      resolved = options.resolve();
    }
    return resolved;
  };
  return {
    get kind() {
      return ensure().kind;
    },
    describe: () => resolved ? resolved.kind : options.describe(),
    isResolved: () => resolved !== null,
    // Every forwarder is `async` on purpose: a resolution failure must surface
    // as a rejected promise, exactly like a network failure would, never as a
    // synchronous throw from a method whose signature promises a Promise.
    exportWorkflow: async (input) => ensure().exportWorkflow(input),
    importWorkflow: async (input) => ensure().importWorkflow(input),
    generateWorkflow: async (input) => ensure().generateWorkflow(input),
    runWorkflow: async (input, onProgress) => ensure().runWorkflow(input, onProgress),
    listWorkflows: async (input) => ensure().listWorkflows(input),
    listTemplates: async () => ensure().listTemplates(),
    getTemplate: async (input) => ensure().getTemplate(input),
    duplicateTemplate: async (input) => ensure().duplicateTemplate(input),
    listProjects: async (input) => ensure().listProjects(input),
    getCredits: async () => ensure().getCredits(),
    renameWorkflow: async (input) => ensure().renameWorkflow(input),
    createProject: async (input) => ensure().createProject(input)
  };
};

// src/core/runner.ts
var detectJsonFlag = (argv) => argv.includes("--json");
var GLOBAL_OPTIONS_TAKING_A_VALUE = /* @__PURE__ */ new Set([
  "--transport",
  "--functions-base-url",
  "--firebase-id-token",
  "--app-base-url"
]);
var LEAF_COMMANDS = /* @__PURE__ */ new Set(["doctor", "credits"]);
var labelCommandFromArgv = (argv) => {
  const positionals = [];
  for (let index = 2; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token) {
      continue;
    }
    if (token.startsWith("-")) {
      if (GLOBAL_OPTIONS_TAKING_A_VALUE.has(token)) {
        index += 1;
      }
      continue;
    }
    positionals.push(token);
    if (positionals.length === 2) {
      break;
    }
  }
  if (positionals.length === 0) {
    return "beemmvision";
  }
  if (positionals.length === 1 || LEAF_COMMANDS.has(positionals[0])) {
    return positionals[0];
  }
  return `${positionals[0]}.${positionals[1]}`;
};
var HELP_COMMANDER_CODES = /* @__PURE__ */ new Set(["commander.helpDisplayed", "commander.help"]);
var VERSION_COMMANDER_CODE = "commander.version";
var GLOBAL_OPTION_COPIES = [
  { flags: "--json" },
  { flags: "--transport <transport>", attribute: "transport" },
  { flags: "--functions-base-url <url>", attribute: "functionsBaseUrl" },
  { flags: "--firebase-id-token <token>", attribute: "firebaseIdToken" }
];
var ROUTING_ATTRIBUTES = ["transport", "functionsBaseUrl", "firebaseIdToken"];
var routingCopiesByCommand = /* @__PURE__ */ new WeakMap();
var installGlobalOptionCopies = (command, root = command) => {
  for (const subcommand of command.commands) {
    const copied = /* @__PURE__ */ new Set();
    for (const copy of GLOBAL_OPTION_COPIES) {
      const option = new Option(copy.flags).hideHelp();
      if (subcommand.options.some((existing) => existing.long === option.long)) {
        continue;
      }
      subcommand.addOption(option);
      if (copy.attribute) {
        copied.add(copy.attribute);
      }
    }
    if (!subcommand.options.some((existing) => existing.long === "--version")) {
      subcommand.addOption(new Option("-V, --version").hideHelp());
      subcommand.on("option:version", () => root.emit("option:version"));
    }
    routingCopiesByCommand.set(subcommand, copied);
    installGlobalOptionCopies(subcommand, root);
  }
};
var collectRoutingOptions = (actionCommand) => {
  const lineage = [];
  for (let current = actionCommand; current; current = current.parent) {
    lineage.unshift(current);
  }
  const routing = {};
  lineage.forEach((command, depth) => {
    const copies = depth === 0 ? new Set(ROUTING_ATTRIBUTES) : routingCopiesByCommand.get(command);
    for (const attribute of ROUTING_ATTRIBUTES) {
      if (routing[attribute] !== void 0 || !copies?.has(attribute)) {
        continue;
      }
      if (command.getOptionValueSource(attribute) !== "cli") {
        continue;
      }
      const value = command.getOptionValue(attribute);
      if (typeof value === "string") {
        routing[attribute] = value;
      }
    }
  });
  return routing;
};
var createProgram = (context, captureCommanderOutput) => {
  const program = new Command();
  const commanderSinks = context.output.configureCommanderOutput();
  program.enablePositionalOptions();
  program.configureHelp({
    subcommandTerm(command) {
      const term = Help.prototype.subcommandTerm.call(this, command);
      return command.options.some((option) => !option.hidden) ? term : term.replace(" [options]", "");
    }
  });
  program.name("beemmvision").version("0.3.2").description("CLI Beemm Vision pilotable par des agents IA pour g\xE9rer projets, workflows et templates.").option("--json", "Emit machine-readable JSON output").option("--transport <transport>", "Transport mode: auto, mock, callable", "auto").option("--functions-base-url <url>", "Base URL for Firebase Functions HTTP endpoints").option("--firebase-id-token <token>", "Firebase ID token used by callable transport").showHelpAfterError().configureOutput({
    // Both streams are tapped, because Commander picks the stream itself:
    // `--help` writes to stdout, while a bare command group and `help
    // <unknown>` write the very same help to stderr. The capture is only
    // ever READ for a help/version outcome, so error text never reaches the
    // payload. Subcommands inherit this configuration.
    writeOut: (str) => {
      captureCommanderOutput(str);
      commanderSinks.writeOut(str);
    },
    writeErr: (str) => {
      captureCommanderOutput(str);
      commanderSinks.writeErr(str);
    }
  }).exitOverride();
  registerWorkflowCommands(program, context);
  registerAuthCommands(program, context);
  registerConfigCommands(program, context);
  registerProjectCommands(program, context);
  registerTemplateCommands(program, context);
  registerDoctorCommand(program, context);
  registerCreditsCommand(program, context);
  installGlobalOptionCopies(program);
  program.hook("preAction", async (_rootCommand, actionCommand) => {
    const routing = collectRoutingOptions(actionCommand);
    if (Object.keys(routing).length > 0) {
      context.runtimeConfig = applyCliRoutingOptions(context.runtimeConfig, routing);
    }
    if (routing.firebaseIdToken) {
      warnTokenOnCommandLine(context);
    }
  });
  return program;
};
var runCli = async (argv, options) => {
  const jsonMode = detectJsonFlag(argv);
  const runtimeConfig = await parseRuntimeConfig({}, options?.env);
  const stdoutBuffer = createOutputBuffer();
  const stderrBuffer = createOutputBuffer();
  const output = createOutputController({
    jsonMode,
    stdoutBuffer,
    stderrBuffer,
    stdoutSink: options?.stdoutSink,
    stderrSink: options?.stderrSink
  });
  const lazyTransport = createLazyWorkflowTransport({
    resolve: () => resolveWorkflowTransport(context.runtimeConfig),
    describe: () => describeTransportTarget(context.runtimeConfig)
  });
  const transportOverride = options?.transportOverride;
  const context = {
    json: jsonMode,
    env: options?.env ?? process.env,
    runtimeConfig,
    transport: transportOverride ?? lazyTransport,
    describeTransport: () => transportOverride ? transportOverride.kind : lazyTransport.describe(),
    output,
    commandName: null,
    response: null
  };
  const restoreConsole = output.captureConsole();
  let exitCode = EXIT_CODES.SUCCESS;
  const resolveResponseCommandName = () => context.commandName ?? labelCommandFromArgv(argv);
  const commanderOutput = createOutputBuffer();
  try {
    const program = createProgram(context, (chunk) => commanderOutput.write(chunk));
    await program.parseAsync(argv);
  } catch (error) {
    if (error instanceof CommanderError2 && (HELP_COMMANDER_CODES.has(error.code) || error.code === VERSION_COMMANDER_CODE)) {
      exitCode = EXIT_CODES.SUCCESS;
      context.response = error.code === VERSION_COMMANDER_CODE ? createSuccessResponse(
        "version",
        { version: error.message.trim() || commanderOutput.value.trim() },
        []
      ) : createSuccessResponse("help", { help: commanderOutput.value.trimEnd() }, []);
    } else {
      const cliError = error instanceof CommanderError2 ? commanderErrorToCliError(error) : normalizeError(error);
      exitCode = cliError.exitCode;
      if (jsonMode) {
        context.response = createErrorResponse(
          resolveResponseCommandName(),
          {
            type: cliError.type,
            message: cliError.message
          },
          context.output.logs
        );
      } else if (!(error instanceof CommanderError2)) {
        context.output.writeHuman(`${cliError.message}
`, "stderr");
      }
    }
  } finally {
    restoreConsole();
  }
  if (jsonMode) {
    if (!context.response) {
      context.response = createErrorResponse(
        resolveResponseCommandName(),
        {
          type: "validation_error",
          message: "No command was executed"
        },
        context.output.logs
      );
      exitCode = EXIT_CODES.VALIDATION;
    }
    output.writeJsonDocument(context.response);
  }
  return {
    exitCode,
    stdout: stdoutBuffer.value,
    stderr: stderrBuffer.value,
    response: context.response
  };
};

// src/index.ts
import { realpathSync } from "node:fs";
import { fileURLToPath } from "node:url";
var resolveSymlink = (path) => {
  try {
    return realpathSync(path);
  } catch {
    return path;
  }
};
var scriptPath = process.argv[1];
var actualScriptPath = scriptPath ? resolveSymlink(scriptPath) : "";
var modulePath = fileURLToPath(import.meta.url);
var isDirectExecution = actualScriptPath ? actualScriptPath === modulePath || actualScriptPath.endsWith("cli/dist/index.js") || actualScriptPath.endsWith("cli\\dist\\index.js") || actualScriptPath.endsWith("cli/dist/bundle.js") || actualScriptPath.endsWith("cli\\dist\\bundle.js") || actualScriptPath.endsWith("beemmvision-cli/index.js") || actualScriptPath.endsWith("beemmvision-cli\\index.js") : false;
if (isDirectExecution) {
  const result = await runCli(process.argv, {
    stdoutSink: (chunk) => process.stdout.write(chunk),
    stderrSink: (chunk) => process.stderr.write(chunk)
  });
  process.exitCode = result.exitCode;
}
export {
  runCli
};
