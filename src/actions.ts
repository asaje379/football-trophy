export enum Action {
  Start = 'start',
  Pause = 'pause',
  Play = 'play',
  ShowBestScore = 'show-best-score',
  ToogleAudio = 'toogle-audio',
  ShowHelp = 'show-help',
}

export const actions: Record<Action, string> = {
  [Action.Start]: 'Jouer',
  [Action.Pause]: 'Pause',
  [Action.Play]: 'Play',
  [Action.ShowBestScore]: 'Meilleur Score',
  [Action.ToogleAudio]: 'Activer/Désactiver le son',
  [Action.ShowHelp]: 'Aide',
};
