from roadmap_templates import ROADMAPS

def generate_roadmap(analysis):
    roadmap = []

    project_types = analysis["project_type"]
    difficulty = analysis["difficulty"][0]

    for ptype in project_types:
        key = (ptype, difficulty)
        if key in ROADMAPS:
            roadmap.extend(ROADMAPS[key])

    # Always add deployment steps
    deploy_key = ("deployment", difficulty)
    roadmap.extend(ROADMAPS.get(deploy_key, []))

    return roadmap
