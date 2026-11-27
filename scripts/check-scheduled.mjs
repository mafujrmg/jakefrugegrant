import { readPostFiles, loadPostFile, SITE_DOMAIN } from './post-utils.mjs';

async function main() {
  const dryRun =
    process.argv.includes('--dry-run') || String(process.env.DRY_RUN || '').toLowerCase() === 'true';
  const nowValue = process.env.SCHEDULE_NOW ? new Date(process.env.SCHEDULE_NOW) : new Date();
  if (Number.isNaN(nowValue.getTime())) {
    console.error(`[schedule] invalid SCHEDULE_NOW: ${process.env.SCHEDULE_NOW}`);
    process.exitCode = 1;
    return;
  }

  let liveBuildTime = null;
  if (process.env.SCHEDULE_BUILT_AT) {
    liveBuildTime = new Date(process.env.SCHEDULE_BUILT_AT);
    if (Number.isNaN(liveBuildTime.getTime())) {
      console.error(`[schedule] invalid SCHEDULE_BUILT_AT: ${process.env.SCHEDULE_BUILT_AT}`);
      process.exitCode = 1;
      return;
    }
  } else {
    const buildInfoUrl = `${SITE_DOMAIN}/build-info.json?t=${Date.now()}`;
    try {
      const response = await fetch(buildInfoUrl, {
        cache: 'no-store',
        headers: { 'Cache-Control': 'no-cache' },
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      liveBuildTime = new Date(data.builtAt);
      if (Number.isNaN(liveBuildTime.getTime())) throw new Error('invalid builtAt value');
    } catch (error) {
      console.error(`[schedule] could not read ${buildInfoUrl} (${error.message}). Doing nothing.`);
      return;
    }
  }

  const loadedPosts = [];
  for (const filePath of readPostFiles()) {
    try {
      const loaded = loadPostFile(filePath);
      if (!loaded.title || !loaded.publish) continue;
      if (!loaded.body.trim()) continue;
      loadedPosts.push(loaded);
    } catch (error) {
      console.warn(`[schedule] warning: ${filePath} could not be read (${error.message})`);
    }
  }

  loadedPosts.sort((a, b) => a.publish.moment.getTime() - b.publish.moment.getTime());
  const seenSlugs = new Set();
  const posts = [];
  for (const loaded of loadedPosts) {
    if (seenSlugs.has(loaded.slug)) continue;
    seenSlugs.add(loaded.slug);
    posts.push({ title: loaded.title, publishMoment: loaded.publish.moment });
  }

  const due = posts.filter(
    (post) =>
      post.publishMoment.getTime() > liveBuildTime.getTime() &&
      post.publishMoment.getTime() <= nowValue.getTime(),
  );

  console.log(`[schedule] now: ${nowValue.toISOString()}`);
  console.log(`[schedule] live build: ${liveBuildTime.toISOString()}`);
  console.log(`[schedule] posts due since live build: ${due.length}`);
  for (const post of due) {
    console.log(`[schedule]   ${post.publishMoment.toISOString()} - ${post.title}`);
  }

  if (due.length === 0) {
    console.log('[schedule] nothing to do.');
    return;
  }

  if (dryRun) {
    console.log('[schedule] dry run: would trigger the build hook.');
    return;
  }

  const hookUrl = process.env.BUILD_HOOK_URL;
  if (!hookUrl) {
    console.error('[schedule] BUILD_HOOK_URL is not set. Not triggering a build.');
    process.exitCode = 1;
    return;
  }

  try {
    const response = await fetch(hookUrl, { method: 'POST' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    console.log(`[schedule] build hook triggered successfully (HTTP ${response.status}).`);
  } catch (error) {
    console.error(`[schedule] failed to trigger build hook: ${error.message}`);
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(`[schedule] unexpected error: ${error.message}`);
  process.exitCode = 1;
});
