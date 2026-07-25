---
description: Commit, push, and deploy kyleskudlarek.com
---

Ship the current changes to production:

1. Review `git status` and `git diff`, then commit all working-tree changes
   directly on `master` (no PR) with a message in the repo's style: short
   descriptive subject, body only when the why isn't obvious from the diff.
   If the tree is clean, skip to step 2.
2. Push to `origin master`.
3. Run `npm run deploy` and confirm both the S3 sync and the CloudFront
   invalidation completed — never deploy without the invalidation.
4. Report the commit hash and confirm the invalidation ID.

If arguments are provided ($ARGUMENTS), treat them as guidance for what to
include in the commit message.
