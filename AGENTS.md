# Agent Entry

Read `AGENT.md` first. Keep context lean: after that, read only `docs/context/brief.md` unless the task specifically needs frontend handoff, backend API, source paths, review, or worklog context.

## 메모리 영속화 (필수)
메모리(현재 에이전트의 로컬 기억)에 운영·findings·피드백 항목을 새로 남기면, 같은 요지를 `docs/DECISIONS.md`에 날짜 항목(결정/이유/영향, 3줄)으로 함께 기록한다. 로컬 메모리는 기기에 묶여 포맷·기기변경 시 소실되고 다른 에이전트가 못 읽으므로, 영속·공용 원본은 git의 DECISIONS에 둔다. 순수 사용자 신원 사실은 제외한다.
