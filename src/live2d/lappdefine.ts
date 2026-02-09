/**
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at https://www.live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

import { LogLevel } from '@framework/live2dcubismframework';
import { ModelNameOverrides, normalizeModelId } from './modelnames';

/**
 * Sample Appで使用する定数
 */

// Canvas width and height pixel values, or dynamic screen size ('auto').
export const CanvasSize: { width: number; height: number } | 'auto' = 'auto';

// キャンバスの数
export const CanvasNum = 0;

// 画面
export const ViewScale = 1.0;
export const ViewMaxScale = 3.0;
export const ViewMinScale = 0.8;

export const ViewLogicalLeft = -1.0;
export const ViewLogicalRight = 1.0;
export const ViewLogicalBottom = -1.0;
export const ViewLogicalTop = 1.0;

export const ViewLogicalMaxLeft = -2.0;
export const ViewLogicalMaxRight = 2.0;
export const ViewLogicalMaxBottom = -2.0;
export const ViewLogicalMaxTop = 2.0;

// 相対パス
export const ResourcesPath = '../Resources/';

// モデルの後ろにある背景の画像ファイル
export const BackImageName = 'back_class_normal.png';

// 歯車
export const GearImageName = 'icon_gear.png';

// 終了ボタン
export const PowerImageName = 'CloseNormal.png';

// モデル定義---------------------------------------------
// モデルを配置したディレクトリ名の配列
// ディレクトリ名とmodel3.jsonの名前を一致させておくこと
export const ModelDir_GFL2: string[] = [
    
    "aiyin_5thanv"
];

export type ModelSourceType = 'model3' | 'moc3';

export type LocalizedNameMap = Record<string, string>;

export interface ModelDefinition {
  id: string;
  displayName: string;
  sourceType: ModelSourceType;
  displayNames?: LocalizedNameMap;
}

function normalizePath(path: string): string {
  return path.replace(/\\/g, '/');
}

function normalizeNameMap(map: Record<string, string> | undefined | null): LocalizedNameMap | undefined {
  if (!map) {
    return undefined;
  }

  const normalized: LocalizedNameMap = {};
  let hasEntries = false;

  for (const [rawKey, value] of Object.entries(map)) {
    if (!rawKey || value == null) {
      continue;
    }
    const key = rawKey.toLowerCase();
    normalized[key] = value;
    hasEntries = true;
  }

  return hasEntries ? normalized : undefined;
}

function resolveNameOverrides(id: string): LocalizedNameMap | undefined {
  if (!id) {
    return undefined;
  }
  const normalizedId = normalizeModelId(id);
  const override =
    ModelNameOverrides[normalizedId] ?? ModelNameOverrides[normalizedId.toLowerCase()];
  return normalizeNameMap(override);
}

function resolveLocaleFromMap(map: LocalizedNameMap, locale: string | undefined): string | undefined {
  if (!map || Object.keys(map).length === 0) {
    return undefined;
  }

  const normalizedLocale = locale ? locale.toLowerCase() : undefined;

  const directMatch =
    normalizedLocale != null ? map[normalizedLocale] : undefined;
  if (directMatch) {
    return directMatch;
  }

  if (normalizedLocale != null) {
    const dashIndex = normalizedLocale.indexOf('-');
    if (dashIndex > 0) {
      const languageOnly = normalizedLocale.substring(0, dashIndex);
      const languageMatch = map[languageOnly];
      if (languageMatch) {
        return languageMatch;
      }
    }
  }

  if (map.en) {
    return map.en;
  }

  const [, firstValue] = Object.entries(map)[0] ?? [];
  return firstValue;
}

function createDisplayNameFromPath(path: string): string {
  const normalized = normalizePath(path);
  const segments = normalized.split('/');
  if (segments.length >= 2) {
    const folder = segments[segments.length - 2];
    const file = segments[segments.length - 1];
    return `${folder}/${file}`;
  }
  return normalized;
}

export function getAvailableModels(gameIndex = 0): ModelDefinition[] {
  switch (gameIndex) {
    case 0:
    default:
      return ModelDir_GFL2.map((entry) => {
        const normalized = normalizePath(entry);
        const displayNames = resolveNameOverrides(normalized);
        return {
          id: entry,
          displayName: entry,
          sourceType: 'model3' as ModelSourceType,
          ...(displayNames ? { displayNames } : {}),
        };
      });
  }
}

export function getModelDefinition(gameIndex: number, modelIndex: number): ModelDefinition | null {
  const models = getAvailableModels(gameIndex);
  if (models.length === 0) {
    return null;
  }
  const safeIndex = ((modelIndex % models.length) + models.length) % models.length;
  return models[safeIndex] ?? null;
}

export function getModelDisplayName(
  model: ModelDefinition,
  locale?: string
): string {
  if (!model) {
    return '';
  }

  const localized =
    model.displayNames && resolveLocaleFromMap(model.displayNames, locale);

  if (localized) {
    return localized;
  }

  return model.displayName;
}

// 外部定義ファイル（json）と合わせる
export const MotionGroupIdle = 'Idle'; // アイドリング
export const MotionGroupTapBody = 'TapBody'; // 体をタップしたとき

// 外部定義ファイル（json）と合わせる
export const HitAreaNameHead = 'Head';
export const HitAreaNameBody = 'Body';

// モーションの優先度定数
export const PriorityNone = 0;
export const PriorityIdle = 1;
export const PriorityNormal = 2;
export const PriorityForce = 3;

// MOC3の一貫性検証オプション
export const MOCConsistencyValidationEnable = true;

// デバッグ用ログの表示オプション
export const DebugLogEnable = true;
export const DebugTouchLogEnable = false;

// Frameworkから出力するログのレベル設定
export const CubismLoggingLevel: LogLevel = LogLevel.LogLevel_Verbose;

// デフォルトのレンダーターゲットサイズ
export const RenderTargetWidth = 1900;
export const RenderTargetHeight = 1000;
